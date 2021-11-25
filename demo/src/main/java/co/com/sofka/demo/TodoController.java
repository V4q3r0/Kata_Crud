package co.com.sofka.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
public class TodoController {

    @Autowired
    TodoService service;

    @GetMapping(value = "api/todos")
    public Iterable<Todo> list(){
        return service.list();
    }

    @PostMapping(value = "api/todo")
    public Todo save(@RequestBody Todo todo){
        return service.save(todo);
    }

    @PutMapping(value = "api/todo")
    public Todo update(@RequestBody Todo todo){
        if(todo.getId() != null){
            return service.save(todo);
        }
        throw new RuntimeException("No existe el id.");
    }

    @GetMapping(value = "api/{id}/todo")
    public Todo get(Long id) throws Exception {
        return service.get(id);
    }

    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathParam("id") Long id) throws Exception {
        service.delete(id);
    }
}
