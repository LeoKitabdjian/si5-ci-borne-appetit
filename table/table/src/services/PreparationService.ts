export function getPreparations(tableId: string) {
    return new Promise<Preparations>((resolve, reject) => {
        fetch("http://localhost:8080/preparations/" + tableId + "/grouped").then((response) => response.json()).then((json) => {
            resolve(json)
        }).catch(() => reject());
    })
}