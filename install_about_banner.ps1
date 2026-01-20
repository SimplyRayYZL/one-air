$source = "C:\Users\Hi-Tech\.gemini\antigravity\brain\4f4eeaf9-4c59-4daa-86c2-36b01b875b64"
$dest = "c:\Users\Hi-Tech\.gemini\antigravity\scratch\oneair-test\src\assets\banners"

Copy-Item "$source\about_us_hero_professional_1768931202352.png" "$dest\about-banner.jpg" -Force

Write-Host "New About Us banner installed."
