# 📦 WhatsApp Catalog Downloader (Chrome Extension)

Una extensión de Google Chrome rápida y sencilla para **descargar todas las imágenes de un producto del catálogo de WhatsApp Web** en un único archivo `.zip`.

> Ideal para revendedores, tiendas, catálogos y archivado de productos desde WhatsApp Business.

---

## 🖼️ Icono de la extensión

Agrega aquí el icono de tu extensión:

```txt
/icon.png
```

---

## 🚀 Características Principales

### 📦 Descarga en ZIP
Agrupa automáticamente todas las imágenes seleccionadas en un solo archivo `.zip`.

### 🖼️ Descarga de Imágenes del Catálogo
Detecta automáticamente las fotos del producto abierto en el catálogo de WhatsApp Web.

### ✅ Selección Inteligente
Permite seleccionar o deseleccionar imágenes antes de descargar.

### 🧠 Filtro Inteligente
Ignora fotos irrelevantes como:

- Fotos de perfil
- Imágenes del chat
- Stickers
- Elementos de interfaz
- Miniaturas no relacionadas

### 🏷️ Auto-Nombrado
El archivo ZIP intenta tomar automáticamente el nombre del producto abierto.

Ejemplo:

```txt
Lenovo ThinkPad L14 G1.zip
```

### 🖼️ Conversión Automática a JPG
Convierte imágenes temporales (`blob:` de WhatsApp) a archivos `.jpg` estándar para máxima compatibilidad.

### ⚡ Interfaz Simple y Rápida
Popup limpio con:

- Seleccionar todo
- Cancelar selección
- Vista previa de imágenes
- Estado de descarga
- Nombre editable del ZIP

---

## 📥 Instalación

Como esta extensión aún no está publicada en la Chrome Web Store, puedes instalarla manualmente:

### 1. Descargar el proyecto

Descarga este repositorio:

```txt
Code → Download ZIP
```

y descomprímelo.

---

### 2. Abrir extensiones de Chrome

Abre:

```txt
chrome://extensions/
```

---

### 3. Activar modo desarrollador

Activa el interruptor:

```txt
Modo de desarrollador
```

(en la esquina superior derecha).

---

### 4. Cargar extensión

Haz clic en:

```txt
Cargar descomprimida
```

Selecciona la carpeta del proyecto.

---

### 5. Listo 🚀

Ahora verás el icono de la extensión en tu barra de Chrome.

---

## 🛠️ Cómo usarla

### 1. Abrir WhatsApp Web

Ir a:

```txt
https://web.whatsapp.com
```

---

### 2. Abrir un catálogo

Entra al chat de un negocio y abre un producto del catálogo.

⚠️ **Importante:** Debes abrir el producto para que las imágenes puedan detectarse.

---

### 3. Abrir la extensión

Haz clic en el icono de la extensión.

La herramienta:

- detectará las imágenes del producto
- mostrará miniaturas
- intentará rellenar automáticamente el nombre del ZIP

---

### 4. Seleccionar imágenes

Puedes:

- dejar todas seleccionadas
- desmarcar algunas
- usar **Seleccionar Todo**
- usar **Cancelar Selección**

---

### 5. Descargar ZIP

Haz clic en:

```txt
Descargar ZIP
```

Se descargará un archivo comprimido con todas las fotos seleccionadas.

---

## 📝 Estructura del Proyecto

### `manifest.json`
Configuración de la extensión y permisos (Manifest V3).

### `content.js`
Script encargado de detectar:

- imágenes del catálogo
- nombre del producto
- filtrado inteligente del DOM de WhatsApp Web

### `popup.html`
Interfaz visual de la extensión.

### `popup.js`
Lógica del popup:

- renderizado de miniaturas
- selección de imágenes
- generación del ZIP
- descarga

### `jszip.min.js`
Librería utilizada para crear archivos `.zip` directamente desde el navegador.

### `icon.png`
Icono de la extensión.

---

## ⚠️ Limitaciones

WhatsApp Web no ofrece una API oficial para catálogos.

La extensión funciona leyendo el DOM de la página, por lo que si WhatsApp cambia su estructura interna, podría requerir actualizaciones futuras.

---

## 💡 Casos de Uso

- Revendedores
- Dropshipping
- Tiendas online
- WhatsApp Business
- Archivado de productos
- Creación rápida de catálogos

---

## ❤️ Proyecto Open Source

Este proyecto es de código abierto.

Siéntete libre de:

- mejorar el código
- reportar bugs
- proponer nuevas funciones
- hacer forks

¡Toda contribución es bienvenida!