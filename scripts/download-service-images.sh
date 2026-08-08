#!/bin/bash
# Download all direct image URLs from the user's list into public/service-images/products/
set -u
cd "$(dirname "$0")/.."

mkdir -p public/service-images/products

# Format: "filename|URL"
IMAGES=(
  "01-afss-annual-fire-safety-statement.jpg|https://sfuploadsau.s3.ap-southeast-2.amazonaws.com/e244470ee0e7f4de50e5fa94c0748ff70c99aa5f.jpg"
  "02-afss-monthly-fire-inspection.jpg|https://www.fireandwire.com.au/_next/image?dpl=dpl_EaWUNvHM6M3hC28mS4NbPsmL31Pk&q=100&url=https%3A%2F%2Ffireandwire.wpenginepowered.com%2Fwp-content%2Fuploads%2F2025%2F07%2FFire-and-Wire-thumb-06.jpg&w=3840"
  "03-afss-smoke-alarm-test.png|https://dcsmoke.com.au/wp-content/uploads/2024/06/DC-PHOTO-13.png"
  "04-afss-emergency-lighting-90min.jpg|https://images.squarespace-cdn.com/content/v1/642ee9324ce4572ea8be1494/ff8efda4-1e31-4ec1-b9fe-878b8b2665fe/Emergency%2BLight%2BTest.JPG"
  "05-afss-weekly-walkthrough.jpg|https://www.gegroup.com.au/wp-content/uploads/2025/12/0X6A1711-1024x683.jpg"
  "06-afss-quarterly-defect.jpg|https://www.fireandwire.com.au/_next/image?dpl=dpl_EaWUNvHM6M3hC28mS4NbPsmL31Pk&q=75&url=https%3A%2F%2Ffireandwire.wpenginepowered.com%2Fwp-content%2Fuploads%2F2025%2F04%2Ffire-and-wire-Does-Your-Victorian-Property-Need-A-Commercial-Fire-System-Audit-During-The-Defect-Liability-Period-DLP-image-3.jpg&w=3840"
  "07-fire-panel-mcp.jpg|https://assets.cef.co.uk/images/pdg/fireandsec_fcp5_r-a/original/fireandsec_fcp5_r-a.jpg"
  "08-fire-panel-afds.jpg|https://www.firesafeanz.com.au/wp-content/uploads/2022/07/Publication1-917x1024.jpg"
  "09-fire-panel-addressable.jpg|https://portalimages.blob.core.windows.net/products/images/g4sty1xi_1.jpg"
  "10-fire-panel-conventional.jpg|https://portalimages.blob.core.windows.net/products/images/fbhm3n5k_3.jpg"
  "11-fire-panel-photoelectric.jpg|https://cdn.wes.com.au/prodimages/section21_images_1024/alm130.jpg"
  "12-fire-panel-heat-detector.jpg|https://flamestopau.b-cdn.net/5836-large_default/est3x-heat-detector-57c-fixed-temperature.jpg"
  "14-smoke-r10rf.jpg|https://elsaustralia.com.au/cdn/shop/files/RSA_R10RF_Boxfront-1030x1030_800x.jpg?v=1714718891"
  "17-smoke-replacement.jpg|https://connectedelectricians.com.au/wp-content/uploads/2022/11/smoke-alarm_img-scaled.jpg"
  "19-fire-door-tag.png|https://www.civilfire.com.au/wp-content/uploads/elementor/thumbs/Door-tag-pixlpg747y9vkiehzdsp2xei3eem8236dc3ezq8n02.png"
  "21-fire-door-gap.jpg|https://www.lathamssteeldoors.co.uk/wp-content/uploads/2023/06/Fire-Door-Gaps.jpg"
  "22-fire-door-ncr.jpg|https://images.squarespace-cdn.com/content/v1/55ca63dae4b0fffc5dd5bf93/1595051038499-KVU6LZ3AGB9VBX41NY62/example-fire-engineering-inspection-report-3.jpg"
  "24-fire-door-intumescent.jpg|https://firedoorfactory.com.au/cdn/shop/products/Kilargo-KG4002-fire-door-factory-sydney_856x.jpg?v=1654940925"
  "30-ext-cover-4-5kg.png|https://www.firebox.net.au/cdn/shop/files/EXTCPBAG4.5.png?v=1691789664"
  "42-hose-reel-annual-test.jpg|https://uploads-ssl.webflow.com/5f90bef882c60468916065fe/5fb2042f8474c4d502515a23_Alexon-equip-maint-fire-hose-mobile.jpg"
  "43-diesel-electric-inspection.jpg|https://www.a1fire.com.au/wp-content/uploads/2023/01/a1-fire-about-us-img-1-1024x1024.jpg"
  "45-diesel-servicing.jpg|https://images.squarespace-cdn.com/content/v1/59cc9188a9db0941ea90a6cf/1648779206549-KCF6VGTMUT46DKGB8BKU/1R4A3824%2B2.jpg"
  "47-sprinkler-pump-inspection.jpg|https://cdn.prod.website-files.com/5f90bef882c60468916065fe/63d9ed65de0a1054bd3e5074_pump-room.jpg"
  "50-smoke-damper.jpg|https://lafgroup.s3.amazonaws.com/64850394-2d64-45bc-8a20-d4517e9958bb.jpg"
  "51-fire-damper-installation.jpg|https://bowsers.com.au/wp-content/uploads/2023/10/G-FD10-Photo-4-cropped-2.jpg.webp"
  "52-hvac-smoke-control.jpg|https://cdn.prod.website-files.com/617ab7c108641e51f654e182/651dbed908dde83fd8e4f231_commisioning-mobile.jpg"
  "57-hydrant-flow-appliance.jpg|https://www.firebox.net.au/cdn/shop/files/IMG_0664_002.jpg?v=1709164535"
  "58-sprinkler-flow-test.jpg|https://www.torvacsolutions.com.au/wp-content/uploads/2021/09/Sprinkler_Flow_Test.jpg"
  "62-fire-damper-inspection.jpg|https://lafgroup.s3.amazonaws.com/64850394-2d64-45bc-8a20-d4517e9958bb.jpg"
  "63-cable-tray-penetration.png|https://www.hilti.at/content/hilti/E3/AT/de/business/trades/electrical/_jcr_content/mainSection/mainColumn/three_image_text_col/image_text_column_21/image.coreimg.png/1729762950527/3012061-l146242-cropped.png"
  "66-fire-rated-mortar.jpg|https://portal.engineersaustralia.org.au/sites/default/files/CFS-BL_3.jpg"
  "67-fire-alarm-zone-plan.jpg|https://fireblockplans.com/wp-content/uploads/2019/05/17-Wonderland-Ave-Zone-Block-plan-01.jpg"
  "68-evacuation-plan.png|https://images.squarespace-cdn.com/content/v1/63226add11e76d06772b9f3a/44862f3e-12ed-4097-a936-1111fe6d4a97/Sample%2BEvacuation%2BDiagram.png"
  "69-hydrant-block-plan.jpg|https://images.squarespace-cdn.com/content/v1/618b137dd9841602dac018ee/03ab8f91-e848-47d1-bad0-1d4734363193/Hydrant%2BBlock%2BPlan%2BSample_Page_1.jpg"
  "70-sprinkler-block-plan.png|https://firewize.com.au/sites/default/files/styles/max_1300x1300/public/2022-08/SprinklerBlockPlanA3H-Example.png.webp?itok=0jzsKbQ5"
  "72-evacuation-drill.jpg|https://first5minutes.com.au/wp-content/uploads/2023/11/First-Five-Minutes_%C2%A9Tatjana-Plitt_H8A9946-1920x1280.jpg"
)

OK=0
FAIL=0
for entry in "${IMAGES[@]}"; do
  filename="${entry%%|*}"
  url="${entry##*|}"
  printf "Downloading %-50s ... " "$filename"
  if curl -L --silent --show-error --fail --max-time 30 -A "Mozilla/5.0" -o "public/service-images/products/$filename" "$url"; then
    size=$(stat -c %s "public/service-images/products/$filename" 2>/dev/null || echo 0)
    echo "OK ($size bytes)"
    OK=$((OK+1))
  else
    echo "FAILED"
    FAIL=$((FAIL+1))
  fi
done

echo ""
echo "Done. OK=$OK FAIL=$FAIL"
