# Automatización E2E con Cypress

Suite de pruebas end-to-end sobre el sitio de IKEA República Dominicana (https://www.ikea.com.do/es), enfocada en el flujo de **inicio de sesión de usuario**.

## Resumen

| | |
|---|---|
| **Aplicación bajo prueba** | https://www.ikea.com.do/es |
| **Flujo cubierto** | Aceptación de cookies, apertura del panel de acceso e inicio de sesión exitoso |
| **Framework** | Cypress 16 |
| **Lenguaje** | JavaScript |
| **Tiempo estimado para ejecutar** | Menos de 5 minutos (incluida la instalación) |

## Inicio rápido

```bash
git clone https://github.com/msj0se/ikea-cypress.git
cd ikea-cypress
npm install
copy cypress.env.json   # macOS/Linux: cp
```

Edita `cypress.env.json` con una cuenta válida del sitio y ejecuta:

```bash
npx cypress run          # modo headless
npx cypress open         # modo interactivo
```

## Requisitos

- Node.js LTS y npm
- Google Chrome (o cualquier navegador soportado por Cypress)
- Una cuenta registrada en https://www.ikea.com.do

## Credenciales

Las credenciales **no están en el repositorio**. Se leen desde `cypress.env.json`, que está en `.gitignore`, mediante `cy.env()`.

```json
{
  "correo": "correo-de-prueba@ejemplo.com",
  "contrasena": "contraseña-de-prueba"
}
```

Para ejecutarlo hay dos opciones:

1. **Usar tu propia cuenta:** puedes registrar una gratuita en el sitio y colocar sus datos en `cypress.env.json`.
2. **Usar la cuenta de prueba que comparto por un canal aparte** (correo o mensaje directo), para no publicar credenciales en un repositorio.

## Caso de prueba

**TC-01 - Inicio de sesión con credenciales válidas**

| Paso | Acción | Verificación |
|---|---|---|
| 1 | Abrir la página principal | Se carga el sitio |
| 2 | Aceptar las cookies | El banner de consentimiento se cierra |
| 3 | Abrir el panel de acceso desde el encabezado | El panel lateral de login es visible |
| 4 | Ingresar correo y contraseña | Los campos reciben los valores |
| 5 | Enviar el formulario | La petición de login responde correctamente |
| 6 | Entrar al área personal | La URL incluye `/client/account` y se muestra el mensaje de bienvenida |

## Estructura del proyecto

```
ikea-cypress/
├── cypress/
│   ├── e2e/                    # Pruebas
│   └── support/
│       └── commands.js         # Comandos personalizados
├── cypress.config.js           # baseUrl y timeouts
├── cypress.env.json    # Plantilla de credenciales
├── .gitignore
└── README.md
```

## Supuestos y limitaciones

- Las pruebas corren contra **producción**, por lo que pueden verse afectadas por cambios del sitio, mantenimiento, captchas o límites de intentos de login.
- Los selectores dependen de la estructura actual de los componentes del sitio (`wc-button`, `sk-sheet`). Si cambian, habrá que actualizarlos.
- El botón de acceso del encabezado solo se muestra en pantallas de al menos 992 px de ancho (el viewport por defecto de Cypress lo cumple). No se cubre la versión móvil.
- El banner de cookies puede no aparecer si ya se aceptó previamente.