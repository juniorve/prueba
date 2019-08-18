import { FormControl } from '@angular/forms';

// usamos esta validacion personalizada para simular 3 cuentas existentes en el backend 
export class UserNameValidator {
    static checkUsername(userName: FormControl) {
        if (userName.value.toLowerCase() === "carlos123" || userName.value.toLowerCase() === "cuenta20" || userName.value.toLowerCase() === "jvalenzuela1") {
            return ({ checkUsername: true });
        } else {
            return (null);
        }
    }
}

