import requests

def get_keys(data, keys_set):
    if isinstance(data, dict):
        for key in data.keys():
            keys_set.add(key)
            get_keys(data[key], keys_set) 
    elif isinstance(data, list):
        for item in data:
            get_keys(item, keys_set) 

def main():
    url = "https://restcountries.com/v3.1/all"
    response = requests.get(url)
    
    if response.status_code == 200:
        json_data = response.json()
        keys_set = set()
        get_keys(json_data, keys_set)

        print("Chaves únicas no JSON:")
        for key in sorted(keys_set):
            print(key)
    else:
        print(f"Erro ao acessar a API: {response.status_code}")

if __name__ == "__main__":
    main()