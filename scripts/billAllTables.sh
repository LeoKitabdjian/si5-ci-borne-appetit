#!/bin/bash

# Récupère les commandes de table
response=$(curl -s "http://localhost:9500/dining/tableOrders/")

# Utilise Python pour extraire les IDs (_id) des commandes non facturées (où "billed" est null)
table_order_ids=($(echo "$response" | python -c "import sys, json; print(' '.join([str(item['_id']) for item in json.load(sys.stdin) if item.get('billed') is None]))"))

# Boucle sur chaque ID pour envoyer la commande bill
for id in "${table_order_ids[@]}"; do
    curl -s -X POST "http://localhost:9500/dining/tableOrders/${id}/bill" > /dev/null
done

echo "Toutes les commandes ont été envoyées."
