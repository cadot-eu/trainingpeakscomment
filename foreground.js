

seek()



setInterval(function () {
    //actualisation de la page
    document.querySelector('.refreshCalendarButton').click()
    seek()
}, 60000);//on recherche des nouveaux messages toutes les minutes


function seek() {
    var checkExist = setInterval(function () {
        if (document.querySelectorAll('.commentCounter').length) {
            clearInterval(checkExist);
            document.querySelectorAll('.commentCounter').forEach((compteur) => {
                // console.log(compteur)
                let numero = compteur.textContent.substr(1)
                let jour = compteur.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.dataset["date"]
                // console.log(jour + '=' + numero)
                if (localStorage.getItem(jour) && localStorage.getItem(jour) != numero) {
                    //on clique sur le commentaire
                    compteur.click()
                    //on attend les infos
                    var checkExist2 = setInterval(function () {
                        if (document.querySelectorAll('.comment').length) {
                            clearInterval(checkExist2);
                            let comments = document.querySelectorAll('.comment');
                            //let messages = '';
                            for (var i = 0; i < Number(numero) - Number(localStorage.getItem(jour)); i++) {
                                let cname = comments[i].querySelector('.commentHeader>.name').textContent
                                let cdate = comments[i].querySelector('.commentHeader>.date').textContent
                                let cmessage = comments[i].querySelector('.commentBody').textContent
                                notifyMe("Nouveau commentaire", cname + " " + "(" + cdate + ")\n" + cmessage)
                                //messages.push({ name: cname, date: cdate, message: cmessage })
                            }
                            // chrome.runtime.sendMessage({
                            //     message: "change_name",
                            //     payload: messages
                            // }, response => {
                            //     if (response.message === 'success') {
                            //         console.log('ok')
                            //     }
                            // });
                        }
                    }, 300);
                    // var checkExist3 = setInterval(function () {
                    //     if (document.getElementById('closeIcon')) {
                    //         clearInterval(checkExist3);
                    //         document.getElementById('closeIcon').click()
                    //     }
                    // }, 300);
                }
                else {
                    localStorage.setItem(jour, numero);
                }

            })
        }
    }, 500); // check every 100ms
}
function notifyMe(title, body) {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
        alert("Merci d'autoriser les notifications pour le script qui détectent les nouveaux commentaires");
    } else {
        var notification = new Notification(title, {
            //icon: 'logo128.png',
            body: body,
            vibrate: [200, 100, 200]
        });
        notification.onclick = function () {
            alert(body)
        };
    }
}