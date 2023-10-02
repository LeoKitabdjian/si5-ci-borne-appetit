#!/bin/bash

# Récupère les préparations prêtes à être servies
response=$(curl -s "http://localhost:9500/kitchen/preparations?state=readyToBeServed")

# Utilise Python pour extraire les IDs
preparation_ids=($(echo "$response" | python -c "import sys, json; print(' '.join([str(item['_id']) for item in json.load(sys.stdin) if '_id' in item]))"))

# Boucle sur chaque ID pour envoyer la commande takenToTable
for id in "${preparation_ids[@]}"; do
    echo ${id}
    curl -s -X POST "http://localhost:9500/kitchen/preparations/${id}/takenToTable" > /dev/null
done

echo "Toutes les commandes ont été envoyées."
