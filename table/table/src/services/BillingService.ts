export function hasPaymentStarted(tableId: string) {
    return new Promise<any>((resolve, reject) => {
        console.log("On check si le paiement à commencé")
        fetch("http://localhost:8080/billings/" + tableId + "/start", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then(result => {
            console.log(result);
            resolve(result);
        }).catch((error) => {
            console.log(error);
            reject(error)
        })
    })
}

export function payTable(tableId: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return new Promise<any>((resolve, reject) => {
        console.log("Paiement pour toute la table")
        fetch("http://localhost:8080/billings/" + tableId, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then(result => {
            console.log(result);
            resolve(result);
        }).catch((error) => {
            console.log(error);
            reject(error)
        })
    })
}

export function getTableAmount(tableId: string) {
    return new Promise<any>((resolve, reject) => {
        console.log("Paiement pour ce client")
        fetch("http://localhost:8080/billings/" + tableId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then(result => {
            console.log("Montant à payer", result);
            resolve(result);
        }).catch((error) => {
            console.log(error);
            reject(error)
        })
    })
}

export function startTablePayment(tableId: string) {
    return new Promise<any>((resolve, reject) => {
        console.log("Démarrage du paiement")
        fetch("http://localhost:8080/billings/" + tableId + "/start", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then(result => {
            console.log(result);
            resolve(result);
        }).catch((error) => {
            console.log(error);
            reject(error)
        })
    })
}