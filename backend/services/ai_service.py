CATEGORY_RULES = {
    "Food": [
        "hotel",
        "restaurant",
        "pizza",
        "burger",
        "cafe",
        "coffee",
        "tea",
        "zomato",
        "swiggy",
        "food"
    ],

    "Transport": [
        "uber",
        "ola",
        "bus",
        "metro",
        "train",
        "fuel",
        "petrol",
        "diesel",
        "taxi"
    ],

    "Shopping": [
        "amazon",
        "flipkart",
        "myntra",
        "shopping",
        "store",
        "mall"
    ],

    "Healthcare": [
        "hospital",
        "doctor",
        "medicine",
        "pharmacy",
        "apollo",
        "clinic"
    ],

    "Entertainment": [
        "movie",
        "netflix",
        "prime",
        "spotify",
        "game"
    ],

    "Utilities": [
        "electricity",
        "water",
        "internet",
        "wifi",
        "gas",
        "bill"
    ]
}


def predict_category(description):
    """
    Predict expense category using keyword matching.
    """

    if not description:
        return "Other"

    description = description.lower()

    for category, keywords in CATEGORY_RULES.items():
        for keyword in keywords:
            if keyword in description:
                return category

    return "Other"