chrome.runtime.onMessage.addListener(
  (msg, sender, sendResponse) => {

    if (msg.action !== "getImages") {
      return;
    }

    try {

      // ==========================
      // IMÁGENES DEL PRODUCTO
      // ==========================

      const visibleImages =
        [...document.images]

          .filter(img => {

            const rect =
              img.getBoundingClientRect();

            return (

              img.src &&
              img.src.startsWith("blob:") &&

              img.naturalWidth > 200 &&
              img.naturalHeight > 200 &&

              rect.width > 50 &&
              rect.height > 50 &&

              rect.top >= 0 &&
              rect.left >= 0
            );
          });

      const images =
        [...new Set(
          visibleImages.map(
            img => img.src
          )
        )];

      // ==========================
      // NOMBRE DEL PRODUCTO
      // ==========================

      let title =
        "catalogo_whatsapp";

      const mainImage =
        visibleImages[0];

      if (mainImage) {

        const imgRect =
          mainImage.getBoundingClientRect();

        const textCandidates =
          [...document.querySelectorAll(
            'span[dir="auto"], div[dir="auto"]'
          )]

            .filter(el => {

              const text =
                el.innerText?.trim();

              if (!text) {
                return false;
              }

              const rect =
                el.getBoundingClientRect();

              // filtros basura
              return (

                text.length > 4 &&
                text.length < 120 &&

                !text.includes("$") &&
                !text.includes("Estado") &&
                !text.includes("Garantía") &&
                !text.includes("Características") &&
                !text.includes("Cuenta de empresa") &&
                !text.includes("Enviar mensaje") &&
                !text.includes("Añadir al carrito") &&
                !text.includes("Leer más") &&
                !text.includes("Catálogo") &&
                !text.includes("Disponible") &&

                rect.width > 50 &&
                rect.height > 10
              );
            })

            .map(el => {

              const rect =
                el.getBoundingClientRect();

              // score de cercanía
              const distance =

                Math.abs(
                  rect.top -
                  imgRect.bottom
                ) +

                Math.abs(
                  rect.left -
                  imgRect.left
                );

              return {
                text:
                  el.innerText.trim(),

                distance
              };
            })

            .sort(
              (a, b) =>
                a.distance -
                b.distance
            );

        if (
          textCandidates.length
        ) {

          title =
            textCandidates[0]
              .text;
        }
      }

      console.log(
        "PRODUCTO:",
        title
      );

      console.log(
        "IMAGENES:",
        images.length
      );

      sendResponse({
        title,
        images
      });

    } catch (err) {

      console.error(
        "WA EXT ERROR:",
        err
      );

      sendResponse({
        title:
          "catalogo_whatsapp",

        images: []
      });
    }

    return true;
  }
);