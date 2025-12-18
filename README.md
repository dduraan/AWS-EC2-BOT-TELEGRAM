# AWS-EC2-BOT-TELEGRAM
<i>Proyecto de AWS que combina instancias EC2 que se conectan a un bot de telegram para ejecutar comandos de manera remota. 
Programado en Node.js</i>
Se utiizará un Linux Server y se configurará instalando todas las dependencias necesarias para luego conectarlo al bot de telegram en nuestros dispositivos móviles,pc...
<h3>Primer paso- Creación de máquina virtual EC2</h3>
Acudiremos al menú principal de nuestra consola, aquí tendremos que buscar un apartado que indique “Lanzar una máquina virtual”. Haremos clic sobre ella.<br>
<img width="886" height="258" alt="image" src="https://github.com/user-attachments/assets/c7a7544d-0801-46a1-bea3-6274156e84e8" />
<br>
Se nos desplegará un menú, y lo primero que se pedirá será un nombre y/o etiquetas para la nueva instancia, puede ser cualquier nombre. En el lado derecho marcado con rojo podremos ir viendo el resumen a medida que vayamos configurando la máquina.
En cuanto a la imagen del sistema operativo, tendremos que elegir la que necesitemos en el menú.
<img width="752" height="513" alt="image" src="https://github.com/user-attachments/assets/e6736b0c-f15e-4f8d-bedd-78f9b32c9772" />
<br>
El tipo de instancia nos indica las características y los precios que generarán los recursos que le añadimos.
<img width="831" height="617" alt="image" src="https://github.com/user-attachments/assets/2095b47b-4877-4bb6-9a6e-a482f8d159ca" />
<br>
Ahora hay que asignarle un par de claves para una conexión segura. Esto es obligatorio ya que si no, no podríamos acceder más tarde a la máquina.
<img width="810" height="331" alt="image" src="https://github.com/user-attachments/assets/4006155c-16aa-4e6b-a451-9f5be3889bce" />
<br>
<img width="737" height="606" alt="image" src="https://github.com/user-attachments/assets/5136b45c-1c25-421d-9b31-01c1a7cb95ae" />
<br>
Ahora vamos a asignarle un almacenamiento específico que en este caso no puede ser inferior a 30GB. Podemos agregarle otros volúmenes. 
<img width="627" height="437" alt="image" src="https://github.com/user-attachments/assets/2384ff29-2f9e-4949-84c0-030997cc2075" />
<br>
<img width="511" height="486" alt="image" src="https://github.com/user-attachments/assets/ac7c8828-e732-4aea-991a-b96678151bec" />
<br>
En cuanto a la configuración de red veremos primero de todo su identificador y la posibilidad de hacer una subred. Podremos asignar IP públicas o dejar que lo haga automáticamente.
El apartado de firewall es importante puesto que hay que crear un grupo de seguridad.
Podemos elegir si permitimos tráfico con qué protocolos y desde dónde. Hay redes para decidir donde se aplicará.
Una vez finalizada la configuración, lanzaremos la instancia y esperaremos a que se cree
<img width="886" height="294" alt="image" src="https://github.com/user-attachments/assets/822b1bd5-dc46-40fb-baf7-3a4dc342be54" />
<br>
Si ahora acudimos al apartado de instancias, podemos ver como ahí se encuentra la que acabamos de crear y que tiene un ID.
<img width="886" height="88" alt="image" src="https://github.com/user-attachments/assets/7a50153e-e67f-4556-8f9d-096881ac8025" />
<br>
Si pulsamos sobre ella veremos los detalles, como la IP pública que la vamos a necesitar ahora o la monitorización de la máquina.
<img width="886" height="464" alt="image" src="https://github.com/user-attachments/assets/018ea047-cca2-42eb-8b7a-1109d205871b" />
<br>
Obtención de descifrado de la contraseña de Windows
Vamos a hacer clic sobre la instancia e iremos al apartado de seguridad para obtener la contraseña de Windows.
<img width="886" height="352" alt="image" src="https://github.com/user-attachments/assets/24ae7e7f-f0cf-4a33-8190-fd6cbc13ac15" />
<br>
Una vez aquí, veremos nuestra instancia y tendremos que subir o escribir la clave descargada anteriormente para poder descifrar la contraseña.
<img width="886" height="744" alt="image" src="https://github.com/user-attachments/assets/d9888242-8814-41b2-a54a-a51158651d71" />
<br>
<img width="603" height="588" alt="image" src="https://github.com/user-attachments/assets/fab2ff3b-4e47-4a70-96c6-7a092a62edff" />
<br>
Es importante apuntarla o guardarla
Conexión a la instancia
Abriremos una conexión a escritorio remoto usando la IP pública de la máquina para conectarnos.
<img width="414" height="555" alt="image" src="https://github.com/user-attachments/assets/3ea8f540-02ba-47be-843c-8cef377a6930" />
<br>
<img width="357" height="460" alt="image" src="https://github.com/user-attachments/assets/cb70cfcd-60f1-4dca-a1df-566252b988ec" />
<br>
Las credenciales serán de manera local, con el usuario que nos han dado y la contraseña copiada anteriormente.
Nos saltará el aviso de que no se puede comprobar el cifrado.
<img width="471" height="469" alt="image" src="https://github.com/user-attachments/assets/4c1c52d4-6866-4977-91ed-8721c2ea2d6e" />
<br>
Listo, ya estaremos dentro de la instancia. Lo ideal ahora sería crearnos un usuario administrador para administrar la cuenta.
<img width="886" height="498" alt="image" src="https://github.com/user-attachments/assets/7d0c35ec-4d48-46c9-bbfc-121c838d27f5" />
<br>
Si minimizamos la instancia y vamos a ella, en el apartado de monitorización veremos los recursos que está usando y los créditos que gasta.
<img width="886" height="233" alt="image" src="https://github.com/user-attachments/assets/b47efcbe-79ad-4c6b-ac25-bd48445a0835" />
<br>
Para detenerla o reiniciarla iremos a estado de la instancia, terminar instancia la eliminará.
<img width="858" height="322" alt="image" src="https://github.com/user-attachments/assets/7e7de22a-42ce-4460-b3ac-c0b6e5c81661" />
<br>
<h3>Segundo paso-Crear bot de telegram</h3>





