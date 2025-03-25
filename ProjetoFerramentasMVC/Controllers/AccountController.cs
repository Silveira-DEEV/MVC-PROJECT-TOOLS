using Microsoft.AspNetCore.Mvc;

namespace ProjetoFerramentasMVC.Controllers
{
    public class AccountController : Controller
    {
        
        public IActionResult Login()
        {
            return View();  
        }

        
        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                ViewBag.ErrorMessage = "E-mail e senha são obrigatórios.";
                return View();  
            }

            if (email == "usuario@exemplo.com" && password == "senha123")
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                ViewBag.ErrorMessage = "Credenciais inválidas.";
                return View();
            }
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(string email, string password, string confirmPassword)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(confirmPassword))
            {
                ViewBag.ErrorMessage = "Todos os campos são obrigatórios.";
                return View(); 
            }

            if (password != confirmPassword)
            {
                ViewBag.ErrorMessage = "As senhas não coincidem.";
                return View();
            }
            ViewBag.SuccessMessage = "Cadastro realizado com sucesso!";
            return RedirectToAction("Login", "Account"); 
        }

        public IActionResult ForgotPassword()
        {
            return View();  
        }

        [HttpPost]
        public IActionResult ForgotPassword(string email)
        {
           
            if (string.IsNullOrEmpty(email))
            {
                ViewBag.ErrorMessage = "Por favor, forneça um e-mail válido.";
                return View();  
            }

            

            ViewBag.SuccessMessage = "Se o e-mail fornecido existir, um link de redefinição foi enviado.";
            return View();  
        }

        public IActionResult Logout()
        {
        

            return RedirectToAction("Login", "Account"); 
        }

        public IActionResult Perfil()
        {
  

            return View(); 
        }
        public IActionResult Cadastro()
{
    return View();
}
    }
}
