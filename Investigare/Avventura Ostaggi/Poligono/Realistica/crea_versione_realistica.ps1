param(
    [string]$SourceSvg = (Join-Path $PSScriptRoot '..\..\Poligono\Mappa_Poligono_A3.svg')
)
$ErrorActionPreference = 'Stop'
$culture = [System.Globalization.CultureInfo]::InvariantCulture
$background = Join-Path $PSScriptRoot 'Poligono_Sfondo_Realistico.png'
$output = Join-Path $PSScriptRoot 'Mappa_Poligono_Realistica_A3.svg'
[xml]$map = Get-Content -LiteralPath $SourceSvg -Raw
$root = $map.DocumentElement
$ns = $root.NamespaceURI
$root.SetAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')

# Keep the original A3 geometry and play aids as native SVG elements.
# The generated illustration is embedded, so the SVG remains self-contained.
$picture = $map.CreateElement('image', $ns)
foreach ($entry in @{x='0'; y='0'; width='420'; height='297'; preserveAspectRatio='none'}.GetEnumerator()) {
    $picture.SetAttribute($entry.Key, $entry.Value)
}
[void]$picture.SetAttribute('href', 'http://www.w3.org/1999/xlink', 'data:image/png;base64,' + [Convert]::ToBase64String([IO.File]::ReadAllBytes($background)))
$picture.SetAttribute('clip-path', 'url(#campo)')
$picture.SetAttribute('id', 'illustrazione-realistica')
$pageBackground = @($root.ChildNodes | Where-Object { $_.LocalName -eq 'rect' })[0]
[void]$root.InsertAfter($picture, $pageBackground)

foreach ($node in @($root.ChildNodes)) {
    if ($node.LocalName -eq 'polygon') {
        # The physical silhouettes now belong to the illustration.
        [void]$root.RemoveChild($node)
    }
    elseif ($node.LocalName -eq 'circle') {
        $radius = [double]::Parse($node.GetAttribute('r'), $culture)
        if ($radius -lt 10) {
            [void]$root.RemoveChild($node)
        }
        else {
            $node.SetAttribute('fill-opacity', '0.025')
            $node.SetAttribute('stroke-opacity', '0.80')
            $node.SetAttribute('stroke-width', '0.42')
        }
    }
    elseif ($node.LocalName -eq 'rect') {
        $fill = $node.GetAttribute('fill')
        if ($fill -in @('#f8f5ee', '#dbe6f1', '#444444')) {
            [void]$root.RemoveChild($node)
        }
        elseif ($node.GetAttribute('stroke') -eq '#333333') {
            $node.SetAttribute('stroke-width', '0.55')
            $node.SetAttribute('stroke', '#4b4b3f')
        }
    }
    elseif ($node.LocalName -eq 'line') {
        $heavy = $node.GetAttribute('stroke-width') -eq '0.5'
        $node.SetAttribute('stroke', '#3f4039')
        $node.SetAttribute('stroke-opacity', $(if ($heavy) { '0.58' } else { '0.40' }))
        $node.SetAttribute('stroke-width', $(if ($heavy) { '0.32' } else { '0.20' }))
    }
    elseif ($node.LocalName -eq 'text') {
        $node.SetAttribute('font-family', 'Arial, sans-serif')
        if ($node.InnerText -in @('colpi', 'scarto')) {
            $node.SetAttribute('fill', '#202822')
            $node.SetAttribute('font-weight', 'bold')
        }
        if ($node.GetAttribute('font-size') -eq '6.5') {
            # Small cream label behind each silhouette number.
            $label = $map.CreateElement('rect', $ns)
            $x = [double]::Parse($node.GetAttribute('x'), $culture) - 0.8
            $y = [double]::Parse($node.GetAttribute('y'), $culture) - 6.2
            $label.SetAttribute('x', $x.ToString('0.00', $culture))
            $label.SetAttribute('y', $y.ToString('0.00', $culture))
            $label.SetAttribute('width', '6.5')
            $label.SetAttribute('height', '7.5')
            $label.SetAttribute('rx', '0.8')
            $label.SetAttribute('fill', '#faf8f0')
            $label.SetAttribute('fill-opacity', '0.93')
            [void]$root.InsertBefore($label, $node)
        }
    }
}

# Score cards remain writable and readable over the textured ground.
$cards = @($root.ChildNodes | Where-Object {
    $_.LocalName -eq 'rect' -and $_.GetAttribute('width') -eq '12.80'
})
foreach ($scoreBox in $cards) {
    $card = $map.CreateElement('rect', $ns)
    $cardX = [double]::Parse($scoreBox.GetAttribute('x'), $culture) - 1.1
    $cardY = [double]::Parse($scoreBox.GetAttribute('y'), $culture) - 9.1
    foreach ($entry in @{x=$cardX.ToString('0.00', $culture); y=$cardY.ToString('0.00', $culture); width='15.00'; height='20.30'; rx='0.9'; fill='#faf8f0'; 'fill-opacity'='0.94'}.GetEnumerator()) {
        $card.SetAttribute($entry.Key, $entry.Value)
    }
    [void]$root.InsertAfter($card, $picture)
}

$settings = [System.Xml.XmlWriterSettings]::new()
$settings.Indent = $true
$settings.Encoding = [System.Text.UTF8Encoding]::new($false)
$writer = [System.Xml.XmlWriter]::Create($output, $settings)
$map.Save($writer)
$writer.Dispose()
Write-Output $output
