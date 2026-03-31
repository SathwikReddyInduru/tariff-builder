package com.xius.tariffBuilder.UserService;
import java.security.MessageDigest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xius.tariffBuilder.UserRepository.UserRepository;



@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // USER login: username + password + network
    public boolean loginUser(String username, String password, String networkName) {
    	
    	String encryptedPassword = encryptPassword(password);
        return userRepository.findByLoginIdAndPasswordAndNetworkDisplay(username, encryptedPassword, networkName)
                .isPresent();
    }

    // ADMIN login: username + password only
    public boolean loginAdmin(String username, String password) {
    	String encryptedPassword = encryptPassword(password);
        return userRepository.findByLoginIdAndPassword(username, encryptedPassword).isPresent();
    }
    public String encryptPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            byte[] result = md.digest(password.getBytes());

			StringBuilder sb = new StringBuilder();
			for (byte b : result) {
				sb.append(String.format("%02X", b));
			}

			return sb.toString();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}