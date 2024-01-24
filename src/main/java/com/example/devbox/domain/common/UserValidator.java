package com.example.devbox.domain.common;

import com.example.devbox.repository.common.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
@RequiredArgsConstructor
public class UserValidator implements Validator {

    private final UserRepository userRepository; // 회원가입시 입력한 username 이 이미 가입한 username 인지 확인하려면 DB 접근 필요

    @Override
    public boolean supports(Class<?> clazz) {
        System.out.println("supports(" + clazz.getName() + ")");
        // ↓ 검증할 객체의 클래스 타입인지 확인
        boolean result = User.class.isAssignableFrom(clazz);
        System.out.println(result);
        return result;
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;

        String username = user.getUsername();
        if(username == null || username.trim().isEmpty()) {
            errors.rejectValue("username", "username 은 필수입니다"); // rejectValue(field, errorcode)
        } else if (userRepository.existsByUsername(username)) {
            // 이미 등록된 중복된 아이디(username) 이 들어오면
            errors.rejectValue("username", "이미 존재하는 이메일(username) 입니다");
        }
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "nickname", "nickname 은 필수입니다");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "password 는 필수입니다");

        // email
        // 입력이 되어 있으면 정규표현식 패턴 체크
//        if (user.getEmail() != null){
//
//        }


        // 입력 password, re_password 가 동일한지 비교
        if (!user.getPassword().equals(user.getRePassword())){
            errors.rejectValue("re_password", "비밀번호와 비밀번호확인 입력값은 같아야 합니다.");
        }

    }

}
