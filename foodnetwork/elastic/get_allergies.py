import openai

openai.api_key = "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"
def gpt_request(ingredients):
    ingredients_str = ", ".join(["'"+e+"'" for e in ingredients]) + "\n"
    response = openai.Completion.create(
    model="gpt-3.5-turbo",
    prompt= f"Is there any allergies for these ingredients: {ingredients_str} Give answer in ordered list with no additional text"
    )
    return response

print(gpt_request(['milk', 'wheat']))