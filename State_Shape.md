# Be-Leaf Clone State Shape

## Overview
```json
"currentUser": {...info,
    "cart": {"plantsById": {...info}}
},
"plants" : {
    "allPlantsById":{...info, "imagesById":[]},
    "currentPlant":{...info, "imagesById":[]}
    },
"reviews": {
    "allReviews": {},
    "currentReview": {}
},
"favorites": {
    "favoritePlantsById": {}
}
```


## Session:

- Current User:

  ```json
  {
    "userId": 1,
    "first_name": "bev",
    "last_name": "Duran",
    "email": "bev@gmail.com",
    "user_icon": "url",
    "shopping_cart": {
        "0": {
            "id": 1,
            "user_id": 1,
            "plant_id": 3,
            "quantity": 5,
            "created_at": time
        },
        "1": {
            "id": 1,
            "user_id": 1,
            "plant_id": 3,
            "quantity": 5,
            "created_at": time
        }
    }
  }
  ```

-Plants:

```json
{
    "allPlants": {
        0: {
            "name": "olive",
            "description": "some text not more than 255",
            "user_id": 1,
            "price": 1,
            "quantity": 4,
            "is_giant:" True,
            "is_pet_friendly": False,
            "images":[ 1: {}, 2: {}],
            "created_At": time
        },
    },
    "current_plant": {
        2: {
            "name": "olive",
            "description": "some text not more than 255",
            "user_id": 1,
            "price": 1,
            "quantity": 4,
            "is_giant:" True,
            "is_pet_friendly": False,
            "images":[ 1: {}, 2: {}],
            "created_At": time
        },
    }
}
```
-Reviews:
```json

{
    "all_reviews": {
        0: {
            "id": 1,
            "user_id": 2,
            "plant_id": 3,
            "rating": 5,
            "content": "some text not more than 255",
            "image": "url",
            "created_at": time
        },
    },
    "current_review": {
        3: {
            "id": 1,
            "user_id": 2,
            "plant_id": 3,
            "rating": 5,
            "content": "some text not more than 255",
            "image": "url",
            "created_at": time
        },
    }

}
```

-Favorites:
```json
{
    "favorites": {
         0: {
            "id": 1,
            "user_id": 2,
            "plant_id": 4
         }
    }
}
```
