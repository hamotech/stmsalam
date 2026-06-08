Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('C:\Users\User\Desktop\syllabuss\teh-tarik-app-my-own\frontend\public\stmsalamlogo.png')
$bmp = new-object System.Drawing.Bitmap($img)
$color = $bmp.GetPixel(0,0)
Write-Host "$($color.R),$($color.G),$($color.B)"
