/* ============================================================
   FANVERSE — auth.js
   Auth guard — add this script to ALL pages except index.html
   ============================================================ */

(function () {
    const loggedIn =
        localStorage.getItem('fanverseLoggedIn') === 'true' ||
        sessionStorage.getItem('fanverseLoggedIn') === 'true';

    if (!loggedIn) {
        window.location.href = 'index.html';
    }
})();
