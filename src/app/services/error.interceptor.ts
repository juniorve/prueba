import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(0),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client error
                        console.log(error);
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server error
                        console.log(error);
                        if (error.status == 500) {
                            errorMessage = 'Ocurrio un error inesperado, comuniquese con su proveedor'
                        } else {
                            if (error.status == 404) {
                                errorMessage = 'No se encontro el recurso, intente con otro valor'
                            } else {
                                if (error.status == 422) {
                                    errorMessage = 'Su solicitud no pudo ser procesada, intente nuevamente'
                                }
                                if (error.error.message) {
                                    errorMessage = `${error.error.message}`;
                                } else {
                                    if (error.error.msg) {
                                        errorMessage = `${error.error.msg}`;
                                    }
                                }
                                if (error.error.errors) {
                                    errorMessage = error.error.errors;
                                }
                            }
                        }
                    }
                    console.log(errorMessage);
                    return throwError(errorMessage);
                })
            )
    }
}
