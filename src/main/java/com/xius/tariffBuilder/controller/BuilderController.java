package com.xius.tariffBuilder.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.xius.tariffBuilder.Dao.LoginForm;
import com.xius.tariffBuilder.UserService.AuthService;

@Controller
public class BuilderController {

    @Autowired
    private AuthService authService;

    @GetMapping("/loginform")
    public String showLoginForm(Model model) {
        model.addAttribute("loginForm", new LoginForm());
        return "login";
    }

    @PostMapping("/login")
    public String processLogin(
            @ModelAttribute("loginForm") LoginForm loginForm,
            Model model,
            HttpSession session) { // ← inject HttpSession

        String role = loginForm.getRole();
        if (role == null || role.trim().isEmpty())
            role = "USER";

        String network = loginForm.getNetworkName();
        String username = loginForm.getUsername();
        String password = loginForm.getPassword();
        String message = "";

        if ("USER".equalsIgnoreCase(role)) {
            if (network == null || network.trim().isEmpty()) {
                message = "Please enter Network Name";
            } else if (username == null || username.trim().isEmpty()) {
                message = "Please enter Username";
            } else if (password == null || password.trim().isEmpty()) {
                message = "Please enter Password";
            } else if (authService.loginUser(username, password, network)) {

                // ✅ Save username to session so layout.html can display it
                session.setAttribute("username", username);
                return "redirect:/builder/step1";

            } else {
                message = "Invalid Username / Password / Network";
            }
        } else if ("ADMIN".equalsIgnoreCase(role)) {
            if (username == null || username.trim().isEmpty()) {
                message = "Please enter Username";
            } else if (password == null || password.trim().isEmpty()) {
                message = "Please enter Password";
            } else if (authService.loginAdmin(username, password)) {

                session.setAttribute("username", username);
                return "redirect:/admin/dashboard";

            } else {
                message = "Invalid Username / Password";
            }
        } else {
            message = "Invalid role selected";
        }

        model.addAttribute("loginForm", loginForm);
        model.addAttribute("message", message);
        return "login";
    }

    // ── Step routes — pass username from session to model ──
    // Thymeleaf can read HttpSession attributes directly via ${session.username},
    // but adding it to model explicitly is cleaner and safer.

    @GetMapping("/builder/step1")
    public String step1(HttpSession session, Model model) {
        model.addAttribute("username", session.getAttribute("username"));
        return "builder/step1";
    }

    @GetMapping("/builder/step2")
    public String step2(HttpSession session, Model model) {
        model.addAttribute("username", session.getAttribute("username"));
        return "builder/step2";
    }

    @GetMapping("/builder/step3")
    public String step3(HttpSession session, Model model) {
        model.addAttribute("username", session.getAttribute("username"));
        return "builder/step3";
    }

    @GetMapping("/builder/step4")
    public String step4(HttpSession session, Model model) {
        model.addAttribute("username", session.getAttribute("username"));
        return "builder/step4";
    }

    @GetMapping("/builder/step5")
    public String step5(HttpSession session, Model model) {
        model.addAttribute("username", session.getAttribute("username"));
        return "builder/step5";
    }
}