import json

with open('countries.json', 'r') as file:
    countries = json.load(file)

regions = set()
subregions = set()

for country in countries:
    if 'region' in country:
        regions.add(country['region'])
    if 'subregion' in country:
        subregions.add(country['subregion'])

print('Regiões:', regions)
print('Sub-regiões:', subregions)
