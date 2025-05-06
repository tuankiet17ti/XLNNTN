from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

def load_model():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    tokenizer = AutoTokenizer.from_pretrained("Ateeqq/product-description-generator")
    model = AutoModelForSeq2SeqLM.from_pretrained("Ateeqq/product-description-generator").to(device)
    return tokenizer, model, device


def generate_description(title, num_descriptions=5, temperature=0.7):
    tokenizer, model, device = load_model()
    
    input_ids = tokenizer(f'description: {title}', return_tensors="pt", padding="longest", 
                         truncation=True, max_length=128).input_ids.to(device)
    
    outputs = model.generate(
        input_ids,
        num_beams=5,
        num_beam_groups=5,
        num_return_sequences=num_descriptions,
        repetition_penalty=10.0,
        diversity_penalty=3.0,
        no_repeat_ngram_size=2,
        temperature=temperature,
        max_length=256
    )
    
    return tokenizer.batch_decode(outputs, skip_special_tokens=True)
