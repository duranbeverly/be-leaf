#!/usr/bin/env bash
# Smoke test against a running server: favorites, creating a plant without a photo
# upload, editing the cart, and deleting a favorited plant. Run after logging the
# demo user in with the cookie jar in ./jar.
set -euo pipefail
BASE=${BASE:-localhost:8000}
csrf() { awk '$6=="csrf_token"{print $7}' jar | tail -1; }
api() { curl -sS -f -c jar -b jar -H "X-CSRFToken: $(csrf)" "$@"; }
json() { python -c "import sys,json; d=json.load(sys.stdin); $1"; }

echo "favorite plant 2 (twice, should be idempotent)"
api -X PUT "$BASE/api/users/favorites/2" | json 'assert "2" in d["user"]["favorites"], d'
api -X PUT "$BASE/api/users/favorites/2" | json 'assert list(d["user"]["favorites"]).count("2") == 1, d'

echo "unfavorite plant 2 (twice, should be idempotent)"
api -X DELETE "$BASE/api/users/favorites/2" | json 'assert "2" not in d["user"]["favorites"], d'
api -X DELETE "$BASE/api/users/favorites/2" | json 'assert "2" not in d["user"]["favorites"], d'

echo "favoriting a missing plant is a 404, logged out is a 401"
test "$(curl -s -o /dev/null -w '%{http_code}' -c jar -b jar -X PUT "$BASE/api/users/favorites/99999")" = 404
test "$(curl -s -o /dev/null -w '%{http_code}' -X PUT "$BASE/api/users/favorites/2")" = 401

echo "create a plant with no photo upload (S3 is off in CI)"
PLANT_ID=$(api -X POST "$BASE/api/plants/new" \
  -F name="CI Test Fern" -F description="A plant made by the CI smoke test." \
  -F price=12 -F quantity=3 -F is_giant=false -F is_pet_friendly=true -F image_url= \
  | json 'p=d["current_plant"]; assert p["preview_image"].startswith("https://"), p; print(p["id"])')
echo "created plant $PLANT_ID"

echo "edit it without a new photo"
api -X PUT "$BASE/api/plants/$PLANT_ID" \
  -F name="CI Test Fern" -F description="Edited by the CI smoke test." \
  -F price=13 -F quantity=3 -F is_giant=false -F is_pet_friendly=true \
  -F image_url="https://be-leaf.s3.amazonaws.com/fern_preview.jpg" \
  | json 'p=d["current_plant"]; assert p["price"] == 13 and p["preview_image"].endswith("fern_preview.jpg"), p'

echo "add plant 3 to the cart, then change the quantity"
api -H "Content-Type: application/json" -d '{"plant_id": 3, "quantity": 1}' "$BASE/api/cart" | json 'assert d["current_item"]["plant_id"] == 3, d'
api -X PUT -H "Content-Type: application/json" -d '{"plant_id": 3, "quantity": 2}' "$BASE/api/cart" | json 'assert d["current_item"]["quantity"] == 2, d'

echo "favorite the new plant, delete it, and make sure the user still exists"
api -X PUT "$BASE/api/users/favorites/$PLANT_ID" | json "assert '$PLANT_ID' in d['user']['favorites'], d"
api -X DELETE "$BASE/api/plants/$PLANT_ID" > /dev/null
api "$BASE/api/auth/" | json "assert d['email'] == 'demo@aa.io' and '$PLANT_ID' not in d['favorites'], d"

echo "smoke test passed"
