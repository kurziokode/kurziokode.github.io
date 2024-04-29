        document.getElementById('toggleCssButton').addEventListener('click', function () {
            var linkElement = document.getElementById('stylesheet');
            if (linkElement.href.endsWith('invert.css')) {
                linkElement.href = 'style.css';
            } else {
                linkElement.href = 'invert.css';
            }
        });
