def gcd(x, y):
    while(y != 0):
        x, y = y, x % y
    return x

def encrypt(p, e, mod):
    out = 1
    for i in range(e):
        out = (out * p) % mod
    return out

def decrypt(c, d, mod):
    out = 1
    for i in range(d):
        out = (out * c) % mod
    return out

def get_public_key(t):
    e = 2
    while e < t and gcd(e, t) != 1:
        e += 1
    return e

def get_private_key(e, t):
    k = 1
    while (e * k) % t != 1 or k == e:
        k += 1
    return k

p = int(input("첫 번째 소수를 입력하세요: "))
q = int(input("두 번째 소수를 입력하세요: "))
n = p * q
t = (p - 1) * (q - 1)

e = get_public_key(t)
print("공개 키 (n, e): (" + str(n) + ", " + str(e) + ")")

d = get_private_key(e, t)
print("개인 키 (n, d): (" + str(n) + ", " + str(d) + ")")

print("학번을 입력하세요:")
std_id = input()
fir = int(std_id[4:6])
sec = int(std_id[6:8])
thr = int(std_id[8:10])

en1 = encrypt(fir, e, n)
en2 = encrypt(sec, e, n)
en3 = encrypt(thr, e, n) 
print("암호화:", std_id[0:4], en1, en2, en3, sep="")

de1 = decrypt(en1, d, n)
de2 = decrypt(en2, d, n)
de3 = decrypt(en3, d, n)
print("복호화: ", std_id[0:4], de1, de2, de3, sep="")
