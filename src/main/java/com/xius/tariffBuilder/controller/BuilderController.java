package com.xius.tariffBuilder.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BuilderController {

    @GetMapping("/builder/step1")
    public String step1() {
        return "builder/step1";
    }

    @GetMapping("/builder/step2")
    public String step2() {
        return "builder/step2";
    }

    @GetMapping("/builder/step3")
    public String step3() {
        return "builder/step3";
    }

    @GetMapping("/builder/step4")
    public String step4() {
        return "builder/step4";
    }

    @GetMapping("/builder/step5")
    public String step5() {
        return "builder/step5";
    }
}