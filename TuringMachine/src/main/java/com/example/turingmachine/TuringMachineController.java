package com.example.turingmachine;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TuringMachineController {
    @GetMapping("machine")
    String machine(){
        return "machine";
    }

    @GetMapping("docs")
    String docs(){
        return "docs";
    }
}
