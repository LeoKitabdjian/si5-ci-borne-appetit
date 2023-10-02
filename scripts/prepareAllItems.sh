#!/bin/bash

# Liste des postes
posts=("BAR" "COLD_DISH" "HOT_DISH")

# Boucle sur chaque poste pour obtenir les ID
all_ids=()
for post in "${posts[@]}"; do
    # Récupère les éléments préparés pour le poste actuel
    response=$(curl -s "http://localhost:9500/kitchen/preparedItems?post=${post}")

    # Utilise Python pour extraire les IDs
    ids=($(echo "$response" | python -c "import sys, json; print(' '.join([str(item['_id']) for item in json.load(sys.stdin)]))"))
    all_ids+=("${ids[@]}")
done

# Boucle sur chaque ID pour envoyer les commandes start et finish
for id in "${all_ids[@]}"; do
    echo ${id}
    curl -s -X POST "http://localhost:9500/kitchen/preparedItems/${id}/start" > /dev/null
    curl -s -X POST "http://localhost:9500/kitchen/preparedItems/${id}/finish" > /dev/null
done

echo "Toutes les commandes ont été envoyées."
