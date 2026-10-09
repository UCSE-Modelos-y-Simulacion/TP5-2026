import json
import hashlib
import sys
import glob
import os

SECRET_SALT = "MODELOS_SIMULACION_UCSE_2026_CATEDRA_SECRET_SALT"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    RESET = '\033[0m'
    CYAN = '\033[96m'
    BOLD = '\033[1m'

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

def sha256_hash(ejercicio_id, item_key, valor):
    text = f"{ejercicio_id}:{item_key}:{valor}:{SECRET_SALT}"
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

def main():
    print(f"{Colors.CYAN}{Colors.BOLD}=== Evaluador Automático TP5 - Pruebas de Independencia ==={Colors.RESET}")
    print("Materia: Modelos y Simulación (UCSE 2026)\n")

    comprobantes = glob.glob("entregas/comprobante_tp5_*.json")
    if not comprobantes:
        print(f"{Colors.RED}❌ Error: No se encontró ningún archivo comprobante_tp5_*.json en la carpeta 'entregas/'.{Colors.RESET}")
        print("Asegúrate de descargar tu comprobante desde index.html y guardarlo dentro de la carpeta 'entregas/'.")
        sys.exit(1)
        
    archivo = comprobantes[0]
    print(f"📄 Analizando comprobante: {archivo}")
    
    with open(archivo, "r", encoding="utf-8") as f:
        try:
            entrega = json.load(f)
        except json.JSONDecodeError:
            print(f"{Colors.RED}❌ Error: El comprobante no contiene un formato JSON válido.{Colors.RESET}")
            sys.exit(1)

    # Verificar existencia de rúbrica pública
    if not os.path.exists("rubric_tp5.json"):
        print(f"{Colors.RED}❌ Error: No se encontró el archivo rubric_tp5.json en el directorio raíz.{Colors.RESET}")
        sys.exit(1)

    with open("rubric_tp5.json", "r", encoding="utf-8") as f:
        rubric = json.load(f)

    asignacion_id = entrega.get('asignacion', 'asignacion_1')
    legajo = entrega.get('legajo', 'desconocido')
    respuestas = entrega.get('respuestas', {})
    
    print(f"🧑‍🎓 Alumno/Legajo: {legajo}")
    print(f"📋 Asignación declarada: {asignacion_id}")

    if asignacion_id not in rubric:
        print(f"{Colors.RED}❌ Error: La asignación '{asignacion_id}' no existe en la rúbrica oficial.{Colors.RESET}")
        sys.exit(1)

    errores = []
    detalles_ok = []
    
    for parte in ['ejA', 'ejB']:
        nombre_parte = f"Ejercicio {parte[-1]}"
        if parte not in respuestas:
            errores.append(f"Falta la resolución completa del {nombre_parte}.")
            continue
            
        rubric_parte = rubric[asignacion_id][parte]
        expected_hashes = rubric_parte.get("hashes", {})
        suffix = 'A' if parte == 'ejA' else 'B'
        target_id = f"{asignacion_id}_{suffix}"
        
        for key, expected_hash in expected_hashes.items():
            if key not in respuestas[parte]:
                errores.append(f"[{nombre_parte}] Falta el campo requerido: '{key}'.")
                continue
                
            valor = str(respuestas[parte][key]).strip()
            actual_hash = sha256_hash(target_id, key, valor)
            
            if expected_hash != actual_hash:
                errores.append(f"[{nombre_parte}] El valor ingresado para '{key}' es incorrecto. (Valor provisto: '{valor}')")
            else:
                detalles_ok.append(f"[{nombre_parte}] {key} = '{valor}' [OK]")

    print("\n--- Desglose de Calificación ---")
    if errores:
        print(f"{Colors.RED}❌ Se encontraron {len(errores)} discrepancia(s):{Colors.RESET}")
        for error in errores:
            print(f"   • {error}")
            
        print(f"\n{Colors.YELLOW}💡 Sugerencia pedagógica:{Colors.RESET}")
        print("Revisa los cálculos en el Workbench de index.html, asegurando el redondeo a 4 decimales")
        print("y consultando el panel bibliográfico 'Dónde estudiar este tema en la teoría de cátedra'.")
        
        if "GITHUB_STEP_SUMMARY" in os.environ:
            with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
                f.write("### ❌ Resultado de Evaluación TP5: Incompleto / Con Discrepancias\n\n")
                f.write(f"- **Legajo:** `{legajo}`\n")
                f.write(f"- **Asignación:** `{asignacion_id}`\n\n")
                f.write("#### Discrepancias encontradas:\n")
                for e in errores:
                    f.write(f"- {e}\n")
                f.write("\n> 💡 Consulta las diapositivas de la Ing. Vázquez y el Cap. 2 de García Dunna para corregir los estadísticos.\n")
        sys.exit(1)
    else:
        print(f"{Colors.GREEN}✅ ¡Felicitaciones! Todos los cálculos de ambos ejercicios son correctos (100/100 Pts).{Colors.RESET}")
        for ok in detalles_ok:
            print(f"   ✓ {ok}")
            
        if "GITHUB_STEP_SUMMARY" in os.environ:
            with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
                f.write("### ✅ Resultado de Evaluación TP5: APROBADO (100/100 Pts)\n\n")
                f.write(f"- **Legajo:** `{legajo}`\n")
                f.write(f"- **Asignación:** `{asignacion_id}`\n")
                f.write(f"- **Estado:** Cumple satisfactoriamente con todos los contrastes de hipótesis estocásticos.\n\n")
                f.write("#### Ítems Validados Criptográficamente:\n")
                for ok in detalles_ok:
                    f.write(f"- {ok}\n")
        sys.exit(0)

if __name__ == "__main__":
    main()
