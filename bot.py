
from openai import OpenAI

def stream_response(user_message: str):
    response = client.chat.completions.create(
        model="qwen3-235b-a22b-instruct-2507",
        messages=[
            {
                "role": "system",
                "content": (
                    "Réponds toujours en français, de façon naturelle, claire et simple. "
                    "N'utilise pas de caractères spéciaux typographiques (tirets, apostrophes courbes, guillemets spéciaux, etc.), "
                    "pas d'emoji, pas de balises, pas de style assistant, pas de formalisme IA. "
                    "Fais comme un humain qui explique à l'oral."
                )
            },
            { "role": "user", "content": user_message },
        ],
        max_tokens=512,
        temperature=0.7,
        top_p=0.8,
        presence_penalty=0,
        stream=False,
    )
    # Afficher la réponse complète directement
    print(response.choices[0].message.content, end="", flush=True)

client = OpenAI(
    base_url = "https://api.scaleway.ai/5378dadd-4f88-4884-ba7b-15f0f386168b/v1",
    api_key = "26f351de-2e15-4eb1-93d6-74f8ead4b565"
)

if __name__ == "__main__":
    import sys
    prompt = " ".join(sys.argv[1:])
    stream_response(prompt)
def stream_response(user_message: str):
