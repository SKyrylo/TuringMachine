package com.example.turingmachine;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TuringMachineController {
    @GetMapping("emulator")
    String machine(){
        return "emulator";
    }

    @GetMapping("docs")
    String docs(){
        return "docs";
    }
}
