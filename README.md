# 📊 TP5: Pruebas Estadísticas de Independencia para Números Pseudoaleatorios

> **Cátedra:** Modelos y Simulación — Ciclo Lectivo 2026  
> **Institución:** Universidad Católica de Santiago del Estero (UCSE) — Facultad de Ingeniería  
> **Carrera:** Ingeniería en Informática (Plan 2019 - 4º Año)  
> **Equipo Docente:** Ing. María Fernanda Vázquez (Titular) | Ing. Fabio Damián Argañaraz Azua (JTP)  
> **Módulo Temático:** Unidad 2 — Recolección, Ajuste de Datos y Validación Conceptual  
> **Plataformas:** GitHub Classroom | Classmoji (`app.classmoji.io`) | Moodle UCSE  

---

## 🎯 Objetivo del Trabajo Práctico

El propósito de este Trabajo Práctico es desarrollar destrezas analíticas y computacionales para verificar empíricamente la **hipótesis de independencia estocástica** ($H_0$) en conjuntos de números pseudoaleatorios $r_i \in (0,1)$, propiedad indispensable para evitar sesgos, autocorrelaciones y estimaciones distorsionadas en estudios de simulación de Monte Carlo y eventos discretos (FlexSim).

Se estudian y aplican en profundidad cuatro contrastes de hipótesis no paramétricos:
1. **Prueba de Corridas Arriba y Abajo** (Runs Up and Down - Test $Z$)
2. **Prueba de Corridas Arriba y Debajo de la Media** (Runs Above and Below the Mean - Test $Z$)
3. **Prueba de Póker** (Análisis combinatorio de dígitos decimales con Test $\chi^2$)
4. **Prueba de Series** (Dispersión bidimensional de pares consecutivos lag-1 en cuadrícula $k \times k$ con Test $\chi^2$)

---

## 🧑‍🎓 Matriz de Asignación Individualizada (8 Alumnos)

Cada estudiante tiene asignado un escenario diferenciado que combina **dos pruebas estadísticas complementarias**, contemplando tanto series con comportamiento ideal como casos con defectos deliberados (tendencias, agrupamientos o ciclos):

| Alumno | Ejercicio A (Prueba 1) | Nivel $\alpha$ / Parámetros | Ejercicio B (Prueba 2) | Nivel $\alpha$ / Parámetros | Comportamiento Esperado |
| :--- | :--- | :---: | :--- | :---: | :---: |
| **Alumno #1** | Corridas Arriba y Abajo | $\alpha=5\%$, $N=50$ (Cátedra Ej. 1) | Prueba de Póker | $\alpha=5\%$, $N=50$ (4 decimales) | Ambos Aceptan $H_0$ |
| **Alumno #2** | Corridas Arriba/Abajo Media | $\alpha=10\%$, $N=50$ (Cátedra Ej. 2) | Prueba de Series ($2 \times 2$) | $\alpha=5\%$, $N=40$ ($m=4$ celdas) | Acepta $H_0$ (A) / Rechaza $H_0$ (B) |
| **Alumno #3** | Prueba de Póker | $\alpha=5\%$, $N=50$ (3 decimales) | Corridas Arriba y Abajo | $\alpha=5\%$, $N=45$ (Tendencia) | Acepta $H_0$ (A) / Rechaza $H_0$ (B) |
| **Alumno #4** | Prueba de Series ($3 \times 3$) | $\alpha=10\%$, $N=50$ (Cátedra Ej. 3) | Corridas Arriba/Abajo Media | $\alpha=5\%$, $N=40$ | Ambos Aceptan $H_0$ |
| **Alumno #5** | Corridas Arriba y Abajo | $\alpha=5\%$, $N=40$ (García Dunna 2.15) | Prueba de Póker | $\alpha=5\%$, $N=30$ (García Dunna 2.17) | Acepta $H_0$ (A) / Rechaza $H_0$ (B) |
| **Alumno #6** | Corridas Arriba/Abajo Media | $\alpha=5\%$, $N=40$ (Hiper-oscilación) | Prueba de Póker | $\alpha=5\%$, $N=50$ (4 decimales) | Rechaza $H_0$ (A) / Acepta $H_0$ (B) |
| **Alumno #7** | Prueba de Series ($2 \times 2$) | $\alpha=5\%$, $N=50$ ($m=4$ celdas) | Corridas Arriba y Abajo | $\alpha=10\%$, $N=50$ | Ambos Aceptan $H_0$ |
| **Alumno #8** | Corridas Arriba/Abajo Media | $\alpha=5\%$, $N=50$ (García Dunna 2.16) | Prueba de Series ($3 \times 3$) | $\alpha=5\%$, $N=60$ (Ciclos) | Acepta $H_0$ (A) / Rechaza $H_0$ (B) |

---

## 📐 Fórmulas Teóricas de Referencia

### 1. Prueba de Corridas Arriba y Abajo
- Secuencia binaria $S$ de longitud $n - 1$:  
  $s_i = 1$ si $r_i > r_{i-1}$, y $s_i = 0$ si $r_i \le r_{i-1}$.
- Media esperada: $\mu_{C_0} = \frac{2n - 1}{3}$
- Varianza: $\sigma^2_{C_0} = \frac{16n - 29}{90}$
- Estadístico de contraste: $Z_0 = \frac{C_0 - \mu_{C_0}}{\sqrt{\sigma^2_{C_0}}}$
- Regla de decisión: Si $|Z_0| \le Z_{\alpha/2}$, no se rechaza $H_0$.

### 2. Prueba de Corridas Arriba y Debajo de la Media
- Secuencia binaria $S$ de longitud $n$:  
  $s_i = 1$ si $r_i \ge 0.5$, y $s_i = 0$ si $r_i < 0.5$.
- Conteo de bits: $n_0$ (ceros) y $n_1$ (unos), con $n_0 + n_1 = n$.
- Media esperada: $\mu_{C_0} = \frac{2 n_0 n_1}{n} + 0.5$
- Varianza: $\sigma^2_{C_0} = \frac{2 n_0 n_1 (2 n_0 n_1 - n)}{n^2 (n - 1)}$
- Estadístico de contraste: $Z_0 = \frac{C_0 - \mu_{C_0}}{\sqrt{\sigma^2_{C_0}}}$
- Regla de decisión: Si $-Z_{\alpha/2} \le Z_0 \le Z_{\alpha/2}$, no se rechaza $H_0$.

### 3. Prueba de Póker
- Clasificación de dígitos decimales:
  - **3 Decimales ($m=3$):** Todos Diferentes (TD, $p=0.72$), Un Par (1P, $p=0.27$), Tercia (T, $p=0.01$).
  - **4 Decimales ($m=5$):** TD ($p=0.5040$), 1P ($p=0.4320$), 2P ($p=0.0270$), T ($p=0.0360$), Póker (P, $p=0.0010$).
  - **5 Decimales ($m=7$):** TD ($0.3024$), 1P ($0.5040$), 2P ($0.1080$), T ($0.0720$), TP ($0.0090$), P ($0.0045$), Q ($0.0001$).
- Frecuencia esperada: $E_i = n \cdot p_i$.
- Estadístico Chi-Cuadrada: $\chi^2_0 = \sum_{i=1}^m \frac{(E_i - O_i)^2}{E_i}$ con $m - 1$ grados de libertad.
- Regla de decisión: Si $\chi^2_0 \le \chi^2_{\alpha, m-1}$, no se rechaza $H_0$.

### 4. Prueba de Series (Bidimensional)
- Pares ordenados consecutivos: $(r_i, r_{i+1})$ para $i = 1, \dots, n-1$ (total $n - 1$ pares).
- Cuadrícula unitaria: partición en $k \times k$ celdas ($m = k^2$).
- Frecuencia esperada uniforme: $E_i = \frac{n - 1}{m}$.
- Estadístico Chi-Cuadrada: $\chi^2_0 = \sum_{i=1}^m \frac{(E_i - O_i)^2}{E_i}$ con $m - 1$ grados de libertad.
- Regla de decisión: Si $\chi^2_0 \le \chi^2_{\alpha, m-1}$, no se rechaza $H_0$.

---

## 🚀 Flujo de Trabajo del Estudiante

1. **Abrir la Plataforma Web:** Haz doble clic en `index.html`. No requiere instalar servidores locales ni Node.js.
2. **Seleccionar Asignación:** Elige la pestaña correspondiente a tu número de alumno (ver matriz arriba).
3. **Ingresar Legajo:** Se solicitará tu número de legajo UCSE para firmar digitalmente el comprobante.
4. **Resolver los Ensayos:** Efectúa los cálculos manuales o en planilla de cálculo, usando redondeo estándar a **4 decimales**.
5. **Autoevaluación en Vivo:** Completa los campos en el *Workbench de Cómputo*.
6. **Descargar Comprobante:** Al obtener **100/100 Pts**, el sistema generará y descargará automáticamente el archivo:  
   `comprobante_tp5_ejercicio_asignacion_X_LEGAJO.json`
7. **Depositar Comprobante:** Guarda dicho archivo dentro de la carpeta `entregas/` de este repositorio.
8. **Verificación Local:** Ejecuta `test.bat` (Windows) o `./test.sh` (Linux/Mac) para confirmar que el evaluador califica con 100/100.
9. **Entrega a GitHub:** Ejecuta los comandos:
   ```bash
   git add entregas/
   git commit -m "Entrega TP5 - Legajo [TU_LEGAJO]"
   git push origin main
   ```
   GitHub Classroom ejecutará el evaluador en GitHub Actions y otorgará el tilde verde ✅.

---

## 🔐 Arquitectura Criptográfica Zero-Knowledge

Para prevenir la copia no analítica por inspección de código fuente (`F12 / DevTools`), la plataforma no almacena ninguna solución en texto plano:
- Cada valor ingresado se normaliza y hashea en tiempo real mediante `crypto.subtle.digest('SHA-256')` concatenado con una sal secreta institucional.
- La rúbrica pública `rubric_tp5.json` únicamente contiene los hashes resultantes.
- El comprobante emitido incluye una firma digital criptográfica que garantiza su autenticidad e inalterabilidad.

---

## 📖 Dónde estudiar en la Bibliografía de Cátedra

- **García Dunna, Reyes & Cárdenas (2006):** *Simulación y Análisis de Sistemas con ProModel*, Pearson Educación. Capítulo 2, Sección 2.4.4 "Pruebas de Independencia" (pp. 53–62).
- **Raúl Coss Bu (2003):** *Simulación: Un Enfoque Práctico*, Limusa. Capítulo 3 "Generación de Números Pseudoaleatorios" (pp. 45–68).
- **Diapositivas Oficiales:** *Teoría - Pruebas de Independencia.pdf / .pptx*, Ing. María Fernanda Vázquez (Diapositivas 1 a 27).
