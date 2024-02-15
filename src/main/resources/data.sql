INSERT INTO authority (authName)
VALUES ('ROLE_USER'),
       ('ROLE_ADMIN')
;

INSERT INTO user (username, password, name, email, enabled)
VALUES
    ('USER1', '$2a$10$6gVaMy7.lbezp8bGRlV2fOArmA3WAk2EHxSKxncnzs28/m3DXPyA2', '회원1', 'user1@mail.com', 1),
    ('USER2', '$2a$10$7LTnvLaczZbEL0gabgqgfezQPr.xOtTab2NAF/Yt4FrvTSi0Y29Xa', '회원2', 'user2@mail.com', 1),
    ('ADMIN1', '$2a$10$53OEi/JukSMPr3z5RQBFH.z0TCYSUDPtxf1/8caRyRVdDNdHA9QHi', '관리자1', 'admin1@mail.com', 1);

INSERT INTO user_authorities(user_userId, authorities_authId)
VALUES (1,1),
       (2, 1),
       (3,1)
