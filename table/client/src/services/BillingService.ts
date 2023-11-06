export function hasPaymentStarted() {
    const urlParams = new URLSearchParams(window.location.search);
    return new Promise<any>((resolve, reject) => {
        console.log("On check l'état du paiement")
        fetch("http://localhost:8080/billings/" + urlParams.get("tableId") + "/start", {
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

export function payClient() {
    const urlParams = new URLSearchParams(window.location.search);
    return new Promise<any>((resolve, reject) => {
        console.log("Paiement pour ce client")
        fetch("http://localhost:8080/billings/" + urlParams.get("tableId") + "/" + urlParams.get("clientId"), {
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

export function getClientAmount() {
    const urlParams = new URLSearchParams(window.location.search);
    return new Promise<any>((resolve, reject) => {
        console.log("Paiement pour ce client")
        fetch("http://localhost:8080/billings/" + urlParams.get("tableId") + "/" + urlParams.get("clientId"), {
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