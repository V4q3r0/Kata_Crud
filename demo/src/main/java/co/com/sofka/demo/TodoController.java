package co.com.sofka.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    //Creamos un objeto de TodoService
    @Autowired
    TodoService service;

    //Endpoint para usar la función de mostrar todos los datos
    @GetMapping(value = "api/todos")
    public Iterable<Todo> list(){
        return service.list();
    }

    //Endpoint para usar la función de guardar los datos
    @PostMapping(value = "api/todo")
    public Todo save(@RequestBody Todo todo){
        return service.save(todo);
    }

    //Endpoint para usar la función de guardar los datos pero esta vez para actualizar
    @PutMapping(value = "api/todo")
    public Todo update(@RequestBody Todo todo){
        if(todo.getId() != null){
            return service.save(todo);
        }
        throw new RuntimeException("No existe el id.");
    }

    //Endpoint para usar la función eliminar un dato
    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathVariable("id") Long id) throws Exception {
        service.delete(id);
    }
}
