document.addEventListener('DOMContentLoaded', () => {

  const container =
    document.getElementById('image-container');

  const downloadBtn =
    document.getElementById('downloadBtn');

  const zipInput =
    document.getElementById('zipName');

  const statusMsg =
    document.getElementById('statusMessage');

  const btnSelectAll =
    document.getElementById('selectAll');

  const btnDeselectAll =
    document.getElementById('deselectAll');

  // DEBUG
  console.log({
    container,
    downloadBtn,
    zipInput,
    statusMsg,
    btnSelectAll,
    btnDeselectAll
  });

  // evitar crash si falta algo
  if (
    !container ||
    !downloadBtn ||
    !zipInput
  ) {
    console.error(
      "Faltan IDs en popup.html"
    );
    return;
  }

  // ==========================
  // HELPERS
  // ==========================

  function toggleSelection(
    wrapper,
    checkbox,
    selected
  ) {

    checkbox.checked =
      selected;

    wrapper.classList.toggle(
      'selected',
      selected
    );

    updateButtonText();
  }

  function updateButtonText() {

    const count =
      document.querySelectorAll(
        '.img-wrapper input:checked'
      ).length;

    downloadBtn.textContent =
      `Descargar ZIP (${count})`;
  }

  async function urlToBlob(url) {

    return new Promise(
      (resolve, reject) => {

      const img =
        new Image();

      img.crossOrigin =
        'anonymous';

      img.onload = () => {

        const canvas =
          document.createElement(
            'canvas'
          );

        canvas.width =
          img.naturalWidth;

        canvas.height =
          img.naturalHeight;

        const ctx =
          canvas.getContext('2d');

        ctx.drawImage(
          img,
          0,
          0
        );

        canvas.toBlob(
          blob => {

            if (blob) {
              resolve(blob);
            } else {
              reject(
                "No blob"
              );
            }

          },
          "image/jpeg",
          0.95
        );
      };

      img.onerror =
        reject;

      img.src =
        url;
    });
  }

  // ==========================
  // CARGAR IMAGENES
  // ==========================

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },

    (tabs) => {

      const tabId =
        tabs[0].id;

      chrome.tabs.sendMessage(
        tabId,
        { action: "getImages" },

        (response) => {

          container.innerHTML =
            '';

          if (
            chrome.runtime
              .lastError
          ) {

            console.error(
              chrome.runtime
                .lastError
            );

            container.innerHTML =
              `
              <div class="no-images">
                Error conectando con WhatsApp
              </div>
            `;

            return;
          }

          // =====================
          // NOMBRE AUTOMATICO
          // =====================

          if (
            response?.title
          ) {

            zipInput.value =
              response.title
                .replace(
                  /[\\/:*?"<>|]/g,
                  "_"
                )
                .trim();

            console.log(
              "Titulo:",
              response.title
            );
          }

          // =====================
          // NO IMAGENES
          // =====================

          if (
            !response ||
            !response.images ||
            response.images.length === 0
          ) {

            container.innerHTML =
              `
              <div class="no-images">
                No se encontraron imágenes
              </div>
            `;

            return;
          }

          // =====================
          // RENDER GRID
          // =====================

          response.images
            .forEach(url => {

            const wrapper =
              document
                .createElement(
                  'div'
                );

            wrapper.className =
              'img-wrapper selected';

            const img =
              document
                .createElement(
                  'img'
                );

            img.src =
              url;

            img.dataset.fullUrl =
              url;

            const checkbox =
              document
                .createElement(
                  'input'
                );

            checkbox.type =
              'checkbox';

            checkbox.className =
              'checkbox';

            checkbox.checked =
              true;

            wrapper.onclick =
              (e) => {

              if (
                e.target !==
                checkbox
              ) {

                checkbox.checked =
                  !checkbox.checked;
              }

              toggleSelection(
                wrapper,
                checkbox,
                checkbox.checked
              );
            };

            wrapper.appendChild(
              img
            );

            wrapper.appendChild(
              checkbox
            );

            container.appendChild(
              wrapper
            );
          });

          updateButtonText();
        }
      );
    }
  );

  // ==========================
  // SELECT ALL
  // ==========================

  btnSelectAll?.addEventListener(
    'click',

    () => {

      document
        .querySelectorAll(
          '.img-wrapper'
        )
        .forEach(
          wrapper => {

          toggleSelection(
            wrapper,
            wrapper.querySelector(
              'input'
            ),
            true
          );
        });
    }
  );

  // ==========================
  // DESELECT ALL
  // ==========================

  btnDeselectAll?.addEventListener(
    'click',

    () => {

      document
        .querySelectorAll(
          '.img-wrapper'
        )
        .forEach(
          wrapper => {

          toggleSelection(
            wrapper,
            wrapper.querySelector(
              'input'
            ),
            false
          );
        });
    }
  );

  // ==========================
  // DESCARGA ZIP
  // ==========================

  downloadBtn.addEventListener(
    'click',

    async () => {

      const selected =
        document.querySelectorAll(
          '.img-wrapper input:checked'
        );

      if (
        selected.length === 0
      ) {

        alert(
          'Selecciona imágenes'
        );

        return;
      }

      downloadBtn.disabled =
        true;

      statusMsg.textContent =
        'Creando ZIP...';

      try {

        const zip =
          new JSZip();

        const filename =
          (
            zipInput.value ||
            'catalogo_whatsapp'
          ) + '.zip';

        for (
          let i = 0;
          i < selected.length;
          i++
        ) {

          statusMsg.textContent =
            `Procesando ${i + 1}/${selected.length}`;

          const url =
            selected[i]
              .previousElementSibling
              .dataset
              .fullUrl;

          const blob =
            await urlToBlob(
              url
            );

          zip.file(
            `imagen_${i + 1}.jpg`,
            blob
          );
        }

        const content =
          await zip.generateAsync({
            type: 'blob'
          });

        const zipUrl =
          URL.createObjectURL(
            content
          );

        chrome.downloads.download({
          url: zipUrl,
          filename,
          saveAs: true
        });

        statusMsg.textContent =
          'Listo';

      } catch (err) {

        console.error(err);

        statusMsg.textContent =
          'Error';
      }

      downloadBtn.disabled =
        false;
    }
  );
});