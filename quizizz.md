# 🎮 Cuestionario Conceptual: Pruebas Estadísticas de Independencia (TP5)

**Cátedra:** Modelos y Simulación — Ciclo Lectivo 2026  
**Institución:** Universidad Católica de Santiago del Estero (UCSE) — Facultad de Ingeniería  
**Carrera:** Ingeniería en Informática  
**Docentes:** Ing. María Fernanda Vázquez | Ing. Fabio Damián Argañaraz Azua  
**Unidad Temática:** Unidad 2 — Pruebas Estadísticas para Números Pseudoaleatorios (Independencia)  

---

## 📋 Banco de 10 Preguntas de Evaluación (Anti-Sesgo)

### 1. ¿Cuál es la diferencia conceptual fundamental entre la propiedad de uniformidad y la propiedad de independencia en una secuencia de números pseudoaleatorios $r_i \in (0,1)$?
- A) La uniformidad garantiza que todos los subintervalos tengan idéntica probabilidad de ocurrencia, mientras que la independencia asegura que el valor de un número no determine ni esté correlacionado con los valores sucesivos.
- B) La independencia requiere que la sumatoria acumulada de los residuos cuadráticos converja asintóticamente hacia una distribución Normal multivariada con media cero y matriz de covarianzas constante en todo el espacio muestral simulado.
- C) La uniformidad analiza las frecuencias de subidas y bajadas temporales, mientras que la independencia calcula la media muestral y la varianza frente a los momentos teóricos de la distribución.
- D) Ambas propiedades son matemáticamente equivalentes, por lo que validar una de ellas demuestra automáticamente la validez de la otra sin necesidad de aplicar contrastes adicionales.
- **Respuesta Correcta:** A

---

### 2. En la prueba de corridas arriba y abajo, ¿cuántos elementos contiene la secuencia binaria $S$ si el conjunto original posee $n$ números pseudoaleatorios?
- A) Contiene exactamente $n$ elementos al comparar cada valor contra el promedio aritmético global de la serie muestral completa.
- B) $n - 1$ elementos.
- C) Contiene $n/2$ elementos debido a que las transiciones de signo únicamente se registran cuando existe un cambio efectivo de polaridad entre números pares e impares sucesivos del generador estocástico.
- D) $n + 1$ elementos para cerrar el ciclo periódico del generador congruencial.
- **Respuesta Correcta:** B

---

### 3. En la prueba de corridas arriba y abajo, ¿cuál es el valor esperado ($\mu_{C_0}$) y la varianza ($\sigma^2_{C_0}$) teóricos del número de corridas observadas para una muestra de tamaño $n$?
- A) $\mu_{C_0} = \frac{n}{2}$ y $\sigma^2_{C_0} = \frac{n}{12}$
- B) Se obtienen integrando numéricamente la función de autocorrelación discreta de primer orden mediante aproximaciones trapezoidales o cuadraturas gaussianas sobre el dominio del intervalo continuo $(0, 1)$.
- C) $\mu_{C_0} = \frac{2n - 1}{3}$ y $\sigma^2_{C_0} = \frac{16n - 29}{90}$
- D) $\mu_{C_0} = \frac{2n_0 n_1}{n} + 0.5$ y $\sigma^2_{C_0} = \frac{2n_0 n_1 (2n_0 n_1 - n)}{n^2 (n - 1)}$
- **Respuesta Correcta:** C

---

### 4. En la prueba de corridas arriba y debajo de la media, ¿cómo se construye la secuencia de ceros y unos a partir de los números $r_i$?
- A) Se asigna 1 si $r_i > r_{i-1}$ y 0 si $r_i \le r_{i-1}$.
- B) Se asigna 1 si la diferencia absoluta con respecto a la media muestral observada supera dos desviaciones estándar empíricas normalizadas según la distribución t de Student con $n-1$ grados de libertad calculada en tiempo de ejecución.
- C) Se asigna 1 si $r_i$ es un número primo y 0 si es compuesto.
- D) Se asigna 1 si $r_i \ge 0.5$ y 0 si $r_i < 0.5$.
- **Respuesta Correcta:** D

---

### 5. Al aplicar la prueba de póker con números de 3 decimales, ¿cuáles son las tres categorías posibles de clasificación y sus probabilidades teóricas asociadas?
- A) Todos Diferentes ($p=0.72$), Un Par ($p=0.27$) y Tercia ($p=0.01$).
- B) Par Menor ($p=0.50$), Par Mayor ($p=0.40$) y Escala Real ($p=0.10$), calculadas asumiendo una distribución hipergeométrica sin reemplazo sobre un mazo de dígitos decimales equiprobables.
- C) Todos Diferentes ($p=0.5040$), Un Par ($p=0.4320$) y Dos Pares ($p=0.0640$).
- D) Ninguna repetición ($p=0.3333$), Una repetición ($p=0.3333$) y Dos repeticiones ($p=0.3334$).
- **Respuesta Correcta:** A

---

### 6. ¿Cuántos grados de libertad posee el estadístico de prueba Chi-Cuadrada ($\chi^2_0$) en una prueba de póker con 4 decimales cuyas categorías son Todos Diferentes, 1 Par, 2 Pares, Tercia y Póker?
- A) 5 grados de libertad, correspondientes exactamente al número total de combinaciones de manos posibles en la partición estocástica.
- B) 3 grados de libertad, puesto que se descuentan dos parámetros estimados a partir de los momentos poblacionales observados durante la prueba de bondad.
- C) 4 grados de libertad ($m - 1 = 5 - 1$).
- D) Depende estrictamente de la cantidad total de números generados $n$ dividida entre el número de clases menos las restricciones de simetría impuestas por el teorema del límite central.
- **Respuesta Correcta:** C

---

### 7. En la prueba de series bidimensional, ¿cuántos pares ordenados $(r_i, r_{i+1})$ se forman a partir de una secuencia de $n$ números y cuál es la frecuencia esperada $E_i$ si se divide el espacio unitario en una cuadrícula de $k \times k$ celdas ($m = k^2$)?
- A) Se forman $n$ pares y la frecuencia esperada se calcula mediante la función de distribución acumulada bivariada conjunta para cada cuadrante geométrico dependiente.
- B) Se forman $n - 1$ pares y la frecuencia esperada en cada celda es $E_i = \frac{n - 1}{m}$.
- C) Se forman $n/2$ pares disjuntos y la frecuencia esperada es $E_i = \frac{n}{2k}$.
- D) Se forman $n^2$ pares posibles y la frecuencia esperada es siempre igual al valor de la semilla multiplicadora inicial.
- **Respuesta Correcta:** B

---

### 8. Si un conjunto de números pseudoaleatorios genera un valor del estadístico $|Z_0| = 3.45$ en la prueba de corridas arriba y abajo con un nivel de significancia $\alpha = 5\%$ ($Z_{\text{crítico}} = 1.96$), ¿cuál es la conclusión técnica correcta?
- A) Se acepta la hipótesis nula ($H_0$), concluyendo que los números son perfectamente independientes y aptos para simulación estocástica.
- B) La prueba no es concluyente, debiendo incrementarse el tamaño de la muestra hasta que el error Tipo II alcance un valor infinitesimal en el informe final.
- C) Se debe recalcular inmediatamente la prueba bajo la hipótesis alternativa de que los números siguen una distribución Gamma estandarizada con parámetros de escala invariantes ante traslaciones temporales.
- D) Se rechaza la hipótesis nula ($H_0$), concluyendo que los números no son independientes (existe autocorrelación o tendencia no aleatoria).
- **Respuesta Correcta:** D

---

### 9. Analizando las propiedades estadísticas de los números pseudoaleatorios, ¿cuál de las siguientes afirmaciones es CORRECTA?
- A) Si una serie supera las pruebas de media ($\mu = 0.5$) y de varianza ($\sigma^2 = 1/12$), queda matemáticamente garantizado que los números provienen de una distribución Uniforme $U(0,1)$ sin necesidad de ninguna otra prueba.
- B) La prueba de póker exige de manera obligatoria e indispensable que los números pseudoaleatorios posean exactamente 5 decimales para poder ejecutarse computacionalmente.
- C) Superar satisfactoriamente la prueba de series descarta que los números presenten ciclos cortos, agrupamientos espaciales o autocorrelaciones rezagadas de orden 1 (lag-1).
- D) Un generador de números congruenciales lineales con período completo siempre genera números independientes en cualquier dimensión sin importar el multiplicador elegido.
- **Respuesta Correcta:** C

---

### 10. ¿Qué consecuencia perjudicial ocurre si se utiliza un generador de números pseudoaleatorios que NO supera las pruebas de independencia dentro de un modelo de simulación de colas (M/M/1) o simulación de inventarios en FlexSim?
- A) El modelo computacional arrojará error de desbordamiento de memoria (Stack Overflow) en el motor interno de eventos discretos del software de simulación.
- B) Las variables aleatorias generadas exhibirán correlaciones espurias, sesgando severamente las colas de espera, los tiempos de ciclo y los intervalos de confianza del sistema simulado.
- C) Los números pseudoaleatorios se transformarán automáticamente en valores determinísticos continuos idénticos a la semilla inicial sin producir eventos en el calendario.
- D) El tiempo de procesamiento por entidad aumentará de forma exponencial requiriendo mayor capacidad de cómputo en la placa gráfica de la estación de trabajo.
- **Respuesta Correcta:** B

---

## 📥 Bloque Aiken Oficial (Importación Inmediata a Moodle UCSE)

```text
¿Cuál es la diferencia conceptual fundamental entre la propiedad de uniformidad y la propiedad de independencia en una secuencia de números pseudoaleatorios r_i en (0,1)?
A) La uniformidad garantiza que todos los subintervalos tengan idéntica probabilidad de ocurrencia, mientras que la independencia asegura que el valor de un número no determine ni esté correlacionado con los valores sucesivos.
B) La independencia requiere que la sumatoria acumulada de los residuos cuadráticos converja asintóticamente hacia una distribución Normal multivariada con media cero y matriz de covarianzas constante en todo el espacio muestral simulado.
C) La uniformidad analiza las frecuencias de subidas y bajadas temporales, mientras que la independencia calcula la media muestral y la varianza frente a los momentos teóricos de la distribución.
D) Ambas propiedades son matemáticamente equivalentes, por lo que validar una de ellas demuestra automáticamente la validez de la otra sin necesidad de aplicar contrastes adicionales.
ANSWER: A

En la prueba de corridas arriba y abajo, ¿cuántos elementos contiene la secuencia binaria S si el conjunto original posee n números pseudoaleatorios?
A) Contiene exactamente n elementos al comparar cada valor contra el promedio aritmético global de la serie muestral completa.
B) n - 1 elementos.
C) Contiene n/2 elementos debido a que las transiciones de signo únicamente se registran cuando existe un cambio efectivo de polaridad entre números pares e impares sucesivos del generador estocástico.
D) n + 1 elementos para cerrar el ciclo periódico del generador congruencial.
ANSWER: B

En la prueba de corridas arriba y abajo, ¿cuál es el valor esperado y la varianza teóricos del número de corridas observadas para una muestra de tamaño n?
A) Valor esperado = n/2 y varianza = n/12
B) Se obtienen integrando numéricamente la función de autocorrelación discreta de primer orden mediante aproximaciones trapezoidales o cuadraturas gaussianas sobre el dominio del intervalo continuo (0, 1).
C) Valor esperado = (2n - 1)/3 y varianza = (16n - 29)/90
D) Valor esperado = (2*n0*n1)/n + 0.5 y varianza = [2*n0*n1*(2*n0*n1 - n)] / [n^2 * (n - 1)]
ANSWER: C

En la prueba de corridas arriba y debajo de la media, ¿cómo se construye la secuencia de ceros y unos a partir de los números r_i?
A) Se asigna 1 si r_i > r_{i-1} y 0 si r_i <= r_{i-1}.
B) Se asigna 1 si la diferencia absoluta con respecto a la media muestral observada supera dos desviaciones estándar empíricas normalizadas según la distribución t de Student con n-1 grados de libertad calculada en tiempo de ejecución.
C) Se asigna 1 si r_i es un número primo y 0 si es compuesto.
D) Se asigna 1 si r_i >= 0.5 y 0 si r_i < 0.5.
ANSWER: D

Al aplicar la prueba de póker con números de 3 decimales, ¿cuáles son las tres categorías posibles de clasificación y sus probabilidades teóricas asociadas?
A) Todos Diferentes (p=0.72), Un Par (p=0.27) y Tercia (p=0.01).
B) Par Menor (p=0.50), Par Mayor (p=0.40) y Escala Real (p=0.10), calculadas asumiendo una distribución hipergeométrica sin reemplazo sobre un mazo de dígitos decimales equiprobables.
C) Todos Diferentes (p=0.5040), Un Par (p=0.4320) y Dos Pares (p=0.0640).
D) Ninguna repetición (p=0.3333), Una repetición (p=0.3333) y Dos repeticiones (p=0.3334).
ANSWER: A

¿Cuántos grados de libertad posee el estadístico de prueba Chi-Cuadrada en una prueba de póker con 4 decimales cuyas categorías son Todos Diferentes, 1 Par, 2 Pares, Tercia y Póker?
A) 5 grados de libertad, correspondientes exactamente al número total de combinaciones de manos posibles en la partición estocástica.
B) 3 grados de libertad, puesto que se descuentan dos parámetros estimados a partir de los momentos poblacionales observados durante la prueba de bondad.
C) 4 grados de libertad (m - 1 = 5 - 1).
D) Depende estrictamente de la cantidad total de números generados n dividida entre el número de clases menos las restricciones de simetría impuestas por el teorema del límite central.
ANSWER: C

En la prueba de series bidimensional, ¿cuántos pares ordenados (r_i, r_{i+1}) se forman a partir de una secuencia de n números y cuál es la frecuencia esperada E_i si se divide el espacio unitario en una cuadrícula de k x k celdas (m = k^2)?
A) Se forman n pares y la frecuencia esperada se calcula mediante la función de distribución acumulada bivariada conjunta para cada cuadrante geométrico dependiente.
B) Se forman n - 1 pares y la frecuencia esperada en cada celda es E_i = (n - 1)/m.
C) Se forman n/2 pares disjuntos y la frecuencia esperada es E_i = n/(2k).
D) Se forman n^2 pares posibles y la frecuencia esperada es siempre igual al valor de la semilla multiplicadora inicial.
ANSWER: B

Si un conjunto de números pseudoaleatorios genera un valor del estadístico |Z_0| = 3.45 en la prueba de corridas arriba y abajo con un nivel de significancia alfa = 5% (Z_critico = 1.96), ¿cuál es la conclusión técnica correcta?
A) Se acepta la hipótesis nula (H0), concluyendo que los números son perfectamente independientes y aptos para simulación estocástica.
B) La prueba no es concluyente, debiendo incrementarse el tamaño de la muestra hasta que el error Tipo II alcance un valor infinitesimal en el informe final.
C) Se debe recalcular inmediatamente la prueba bajo la hipótesis alternativa de que los números siguen una distribución Gamma estandarizada con parámetros de escala invariantes ante traslaciones temporales.
D) Se rechaza la hipótesis nula (H0), concluyendo que los números no son independientes (existe autocorrelación o tendencia no aleatoria).
ANSWER: D

Analizando las propiedades estadísticas de los números pseudoaleatorios, ¿cuál de las siguientes afirmaciones es CORRECTA?
A) Si una serie supera las pruebas de media (mu = 0.5) y de varianza (sigma^2 = 1/12), queda matemáticamente garantizado que los números provienen de una distribución Uniforme U(0,1) sin necesidad de ninguna otra prueba.
B) La prueba de póker exige de manera obligatoria e indispensable que los números pseudoaleatorios posean exactamente 5 decimales para poder ejecutarse computacionalmente.
C) Superar satisfactoriamente la prueba de series descarta que los números presenten ciclos cortos, agrupamientos espaciales o autocorrelaciones rezagadas de orden 1 (lag-1).
D) Un generador de números congruenciales lineales con período completo siempre genera números independientes en cualquier dimensión sin importar el multiplicador elegido.
ANSWER: C

¿Qué consecuencia perjudicial ocurre si se utiliza un generador de números pseudoaleatorios que NO supera las pruebas de independencia dentro de un modelo de simulación de colas (M/M/1) o simulación de inventarios en FlexSim?
A) El modelo computacional arrojará error de desbordamiento de memoria (Stack Overflow) en el motor interno de eventos discretos del software de simulación.
B) Las variables aleatorias generadas exhibirán correlaciones espurias, sesgando severamente las colas de espera, los tiempos de ciclo y los intervalos de confianza del sistema simulado.
C) Los números pseudoaleatorios se transformarán automáticamente en valores determinísticos continuos idénticos a la semilla inicial sin producir eventos en el calendario.
D) El tiempo de procesamiento por entidad aumentará de forma exponencial requiriendo mayor capacidad de cómputo en la placa gráfica de la estación de trabajo.
ANSWER: B
```
