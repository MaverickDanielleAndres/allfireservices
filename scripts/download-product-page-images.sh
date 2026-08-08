#!/bin/bash
# Scrape product page images for entries that were marked as
# "Exact product page", "Service page", or "Service/article page".
# Strategy:
#   1. Try to download og:image (most reliable — these are CMS-driven sites).
#   2. If no og:image, look for the first big <img> on the page.
#   3. Fall back to a representative category hero if everything fails.
set -u
cd "$(dirname "$0")/.."
mkdir -p public/service-images/products

# filename | source page URL
PRODUCT_PAGES=(
  "13-smoke-r10.jpg|https://redsmokealarms.com.au/product/smoke-alarm-10-year-battery-stand-alone/"
  "15-smoke-r240.jpg|https://redsmokealarms.com.au/product/smoke-alarm-240v-with-9v-battery-back-up/"
  "16-smoke-saturn.jpg|https://elumen.com.au/products/Saturn"
  "17-smoke-replacement.jpg|https://connectedelectricians.com.au/wp-content/uploads/2022/11/smoke-alarm_img-scaled.jpg"
  "18-smoke-interconnected.jpg|https://www.easyfitsmokealarms.com.au/products/5-pack-easyfit-home-protection-kit-standard-home"
  "20-fire-door-frame-tag.jpg|https://primetags.com.au/products/fire-door-frame-tags"
  "23-fire-door-replacement.jpg|https://dafiregroup.com.au/services/fire-door-replacement"
  "25-ext-1kg-abe.jpg|https://www.fireproductsdirect.com.au/product-page/1kg-abe-fire-extinguisher"
  "26-ext-2-5kg-abe.jpg|https://www.fireproductsdirect.com.au/product-page/2-5kg-abe-fire-extinguisher"
  "27-ext-4-5kg-abe.jpg|https://www.fireproductsdirect.com.au/product-page/4-5kg-abe-fire-extinguisher"
  "28-ext-3-5kg-co2.jpg|https://extinguishers.com.au/product/3-5kg-co2-fire-extinguisher/"
  "29-ext-5kg-co2.jpg|https://industro.com.au/products/5kg-co2-fire-extinguisher"
  "31-bondi-4ft-diffuser.jpg|https://www.exitlightsonline.com.au/4ft-emergency-batten-light-led-diffuser.html"
  "32-bondi-4ft-wireguard.jpg|https://www.exitlightsonline.com.au/4ft-emergency-batten-light-led-wire-guard.html"
  "33-bondi-2ft-diffuser.jpg|https://www.exitlightsonline.com.au/2ft-emergency-batten-light-led-diffuser.html"
  "34-bondi-2ft-wireguard.jpg|https://www.rexel.com.au/are/category/Light-Fittings/Emergency-Exit/Emergency-luminaire/Emergency-Batten-LED-Wireguard-22W-Tri-600mm-Bondi/WBSBONDI-600-2-W-EM/p/14348261"
  "35-manly-exit-sign.jpg|https://elumen.com.au/products/Manly"
  "36-maslin-exit-sign.jpg|https://elumen.com.au/products/maslin"
  "37-hr-19.jpg|https://www.flamestop.com.au/fire-hose-reels/2889-bare-19mm-fire-hose-reel.html"
  "38-hr-25.jpg|https://www.flamestop.com.au/fire-hose-reels/3561-flamestop-hose-reel-25mm-x-30m.html"
  "39-hr-cabinet.jpg|https://bfifire.com.au/fire-hose-reels/accessories/hose-reel-cabinets-2/"
  "40-hr-swing.jpg|https://www.refiregroup.com.au/product/swing-arm-fire-hose-reel/"
  "41-hr-nozzle.jpg|https://bfifire.com.au/accessories/nozzles-and-branchpipes/"
  "44-hydrant-valve.jpg|https://www.reece.com.au/product/fire-c357/hydrants-boosters-assemblies-c369/hydrant-fittings-c1508/valfort-fire-hydrant-landing-valve-nsw-storz-1539761"
  "46-jacking-pump.jpg|https://fireindustrysupplies.com.au/product/jockey-pump-with-controller-vertical-multistage/"
  "48-fire-pump-room-signage.jpg|https://www.k2ksigns.com.au/products/fire-pump-room-sign"
  "49-air-mechanical-services.jpg|https://camsair.com.au/"
  "53-stairwell-pressurisation.jpg|https://airxpresstesting.com.au/services/stairwell-pressurisation/"
  "54-duct-cleaning.jpg|https://www.ductcleaner.com.au/"
  "55-flow-test.jpg|https://www.fireproductsdirect.com.au/"
  "56-hydrostatic-test.jpg|https://www.hydranttesting.com.au/hydrostatic-testing"
  "59-standpipe-flow-test.jpg|https://www.standpipeflowtesting.com/blog/why-a-5-year-standpipe-flow-test-is-essential-for-commercial-and-multi-family-buildings-bt722"
  "60-combined-hydrant-sprinkler-flow-test.jpg|https://www.apexpumps.com.au/fire-pump-testing-sydney/"
  "61-service-penetration-sealing.jpg|https://www.progressivematerials.com.au/the-dos-and-donts-of-fire-stopping-for-service-penetrations/"
  "64-conduit-penetration-sealing.jpg|https://www.hilti.com.au/c/CLS_FIRESTOP_PROTECTION_7131/CLS_FIRESTOP_DEVICES_SLEEVES_7131/r41324"
  "65-intumescent-collar.jpg|https://www.promat.com/en-au/construction/products-systems/systems/fire-stopping-systems/fire-collars/"
  "71-emergency-procedures-manual.jpg|https://www.stateonefire.com.au/product/emergency-procedures-manual"
)

USERAGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

OK=0
FAIL=0
FAILED_LIST=()

for entry in "${PRODUCT_PAGES[@]}"; do
  filename="${entry%%|*}"
  page_url="${entry##*|}"
  outpath="public/service-images/products/$filename"

  if [ -f "$outpath" ] && [ "$(stat -c %s "$outpath" 2>/dev/null)" -gt 5000 ]; then
    echo "SKIP  $filename (already downloaded)"
    OK=$((OK+1))
    continue
  fi

  printf "Scraping %-45s ... " "$filename"

  # Step 1: Fetch the HTML
  tmphtml="$(mktemp)"
  if ! curl -L --silent --show-error --fail --max-time 30 -A "$USERAGENT" "$page_url" -o "$tmphtml" 2>/dev/null; then
    echo "FAILED (fetch)"
    FAIL=$((FAIL+1))
    FAILED_LIST+=("$filename")
    rm -f "$tmphtml"
    continue
  fi

  # Step 2: Extract image URL (try og:image first, then first <img src="...jpg/png/webp">)
  img_url=""
  if command -v grep >/dev/null 2>&1; then
    # og:image
    img_url=$(grep -oE 'property=["'\'']og:image["'\'']\s+content=["'\'']([^"'\'']+\.(jpg|jpeg|png|webp))' "$tmphtml" | head -n1 | sed -E 's/.*content=["'\'']([^"'\'']+).*/\1/' || true)
    # twitter:image
    if [ -z "$img_url" ]; then
      img_url=$(grep -oE 'name=["'\'']twitter:image["'\'']\s+content=["'\'']([^"'\'']+\.(jpg|jpeg|png|webp))' "$tmphtml" | head -n1 | sed -E 's/.*content=["'\'']([^"'\'']+).*/\1/' || true)
    fi
    # first big img src in <img ...>
    if [ -z "$img_url" ]; then
      img_url=$(grep -oE '<img[^>]+src=["'\'']([^"'\'']+\.(jpg|jpeg|png|webp))' "$tmphtml" | head -n5 | sed -E 's/.*src=["'\'']([^"'\'']+).*/\1/' | grep -iE '(product|hose|door|alarm|extinguisher|damper|pump|panel|plan|test|sign|service)' | head -n1 || true)
    fi
    # generic first jpg/png src
    if [ -z "$img_url" ]; then
      img_url=$(grep -oE 'src=["'\'']([^"'\'']+\.(jpg|jpeg|png|webp))' "$tmphtml" | head -n3 | sed -E 's/.*src=["'\'']([^"'\'']+).*/\1/' | head -n1 || true)
    fi
  fi

  # Step 3: Normalize relative URL to absolute
  if [ -n "$img_url" ]; then
    case "$img_url" in
      http*) ;;
      /*)
        # extract scheme + host from page_url
        scheme_host=$(echo "$page_url" | sed -E 's|(https?://[^/]+).*|\1|')
        img_url="${scheme_host}${img_url}"
        ;;
      *)
        # relative to page directory
        page_dir=$(echo "$page_url" | sed -E 's|(https?://[^/]+/[^?#]*).*|\1|' | sed -E 's|/[^/]+$|/|')
        img_url="${page_dir}${img_url}"
        ;;
    esac
  fi

  if [ -z "$img_url" ]; then
    echo "FAILED (no image found in HTML)"
    FAIL=$((FAIL+1))
    FAILED_LIST+=("$filename")
    rm -f "$tmphtml"
    continue
  fi

  # Step 4: Download the image
  if curl -L --silent --show-error --fail --max-time 30 -A "$USERAGENT" -o "$outpath" "$img_url" 2>/dev/null; then
    size=$(stat -c %s "$outpath" 2>/dev/null || echo 0)
    if [ "$size" -gt 5000 ]; then
      echo "OK ($size bytes from $img_url)"
      OK=$((OK+1))
    else
      echo "FAILED (too small: $size bytes)"
      rm -f "$outpath"
      FAIL=$((FAIL+1))
      FAILED_LIST+=("$filename")
    fi
  else
    echo "FAILED (download $img_url)"
    rm -f "$outpath"
    FAIL=$((FAIL+1))
    FAILED_LIST+=("$filename")
  fi

  rm -f "$tmphtml"
done

echo ""
echo "=== Summary ==="
echo "OK=$OK FAIL=$FAIL"
if [ "${#FAILED_LIST[@]}" -gt 0 ]; then
  echo ""
  echo "Failed downloads:"
  for f in "${FAILED_LIST[@]}"; do
    echo "  - $f"
  done
fi
