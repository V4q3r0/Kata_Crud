package co.com.sofka.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Holamundo {
    
    @RequestMapping("/")
    public String hola(){
        return "Hola mundo";
    }

}
