Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

$root = 'C:\Users\user\Documents\ChatGPT\edm_gpt'
$frameDir = Join-Path $root 'gif-frames'
$output = Join-Path $root 'public\edm-character.gif'
$canvasWidth = 650
$canvasHeight = 1024

$sourcePaths = @(
  (Join-Path $frameDir 'input-walk-r.png'),
  (Join-Path $frameDir 'input-front.png'),
  (Join-Path $frameDir 'input-walk-l.png')
)
$outputNames = @('walk-r.png', 'front.png', 'walk-l.png')

New-Item -ItemType Directory -Force -Path $frameDir | Out-Null

for ($index = 0; $index -lt $sourcePaths.Count; $index++) {
  $source = [System.Drawing.Image]::FromFile($sourcePaths[$index])
  $canvas = New-Object System.Drawing.Bitmap($canvasWidth, $canvasHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($canvas)
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
  $x = [Math]::Floor(($canvasWidth - $source.Width) / 2)
  $graphics.DrawImage($source, $x, 0, $source.Width, $source.Height)
  $graphics.Dispose()
  $source.Dispose()
  $canvas.Save((Join-Path $frameDir $outputNames[$index]), [System.Drawing.Imaging.ImageFormat]::Png)
  $canvas.Dispose()
}

# A calm four-step cadence avoids the hard snap at the loop boundary:
# stride, settle, opposite stride, settle.
$frames = @(
  @{ name = 'walk-r.png'; delay = 18 },
  @{ name = 'front.png'; delay = 10 },
  @{ name = 'walk-l.png'; delay = 18 },
  @{ name = 'front.png'; delay = 10 }
)

$encoder = New-Object System.Windows.Media.Imaging.GifBitmapEncoder
$first = $true
foreach ($frame in $frames) {
  $path = Join-Path $frameDir $frame.name
  $bitmap = New-Object System.Windows.Media.Imaging.BitmapImage
  $bitmap.BeginInit()
  $bitmap.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
  $stream = [System.IO.File]::OpenRead($path)
  $bitmap.StreamSource = $stream
  $bitmap.EndInit()
  $bitmap.Freeze()
  $stream.Dispose()

  $metadata = New-Object System.Windows.Media.Imaging.BitmapMetadata('gif')
  $metadata.SetQuery('/grctlext/Delay', [UInt16]$frame.delay)
  $metadata.SetQuery('/grctlext/Disposal', [Byte]2)
  if ($first) {
    $metadata.SetQuery('/appext/Application', [System.Text.Encoding]::ASCII.GetBytes('NETSCAPE2.0'))
    $metadata.SetQuery('/appext/Data', [Byte[]](3, 1, 0, 0, 0))
    $first = $false
  }
  $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($bitmap, $bitmap, $metadata, $bitmap.ColorContexts))
}

$outputStream = [System.IO.File]::Open($output, [System.IO.FileMode]::Create)
$encoder.Save($outputStream)
$outputStream.Dispose()
Write-Output $output
