# PHP Gantt Demo

This is a demo showing our Bryntum Gantt component running with a PHP backend. It simply implements a backend for
the `advanced` example.

Requirements for this example :

- WebServer (Apache or similar)
- PHP 5.4+ (with PDO module enabled)
- MySQL 5+

Please follow the basic PHP installation instructions below. More advanced instructions may be found on the web.

# Basic Apache + PHP + MySQL installation instructions for Linux

Update the package lists for upgrades and package installations:

```shell
sudo apt update
```

Install Apache web server:

```shell
sudo apt install apache2
```

Enable and start the Apache service:

```shell
sudo systemctl enable apache2
sudo systemctl start apache2
```

Install PHP 8 and required modules:

```shell
sudo apt-get install php8.0 libapache2-mod-php8.0 php8.0-mysql php8.0-curl php8.0-gd php8.0-mbstring php8.0-xml php8.0-xmlrpc php8.0-intl php8.0-soap php8.0-zip
```

Restart Apache to apply the changes:

```shell
sudo systemctl restart apache2
```

Default webserver pages location is in the `/var/www/html` folder.

# Basic Apache + PHP + MySQL installation instructions for Windows

Download Apache HTTP Server for Windows from the official website: https://httpd.apache.org/download.cgi. Choose the
latest stable release and download the Windows binary.

Install Apache by running the downloaded installer. Choose "Typical" installation type and follow the prompts.

After the installation is complete, open the `httpd.conf` file located in the `conf` directory inside the Apache
installation folder. Add the following line at the end of the file:

```text
Listen 80
```

Save the `httpd.conf` file and close it.

Download the latest PHP 8 for Windows from the official website: https://www.php.net/downloads.php. Choose the
Non-Thread Safe (NTS) version that matches your system architecture (x86 or x64).

Extract the downloaded PHP archive to a folder of your choice, e.g., `C:\php`.

Rename the `php.ini-development` file to `php.ini` in the PHP installation folder.

Open the `php.ini` file and uncomment (remove the semicolon) the following lines:

```text
extension_dir = "ext"
extension = mysqli
extension = pdo_mysql
```

Add the PHP installation folder (e.g., `C:\php`) to your system's `PATH` environment variable.

Open the Apache `httpd.conf` file again and add the following lines at the end:

```text
LoadModule php_module "C:/php/php8apache2_4.dll"
AddType application/x-httpd-php .php
PHPIniDir "C:/php"
```

Make sure to adjust the paths if your PHP installation is in a different folder.

Save the `httpd.conf` file and close it.

Restart the Apache HTTP Server by opening the "Services" application, finding the "Apache2.4" service, right-clicking on
it, and selecting "Restart".

Download MySQL Community Server for Windows from the official website: https://dev.mysql.com/downloads/mysql/. Choose
the MSI Installer version.

Install MySQL by running the downloaded installer. Choose the "Developer Default" installation type and follow the
prompts to complete the installation. During the installation, you will be prompted to configure MySQL and DB user.

Default webserver pages location is in the `htdocs` folder inside the Apache installation directory.

# Basic Apache + PHP + MySQL installation instructions for MacOS

Update Homebrew, a package manager for macOS:
```
brew update
```

If you don't have Homebrew installed, visit https://brew.sh/ and follow the instructions to install it.

Install Apache by running the following command:

```shell
brew install httpd
```

Start Apache using the following command:

```shell
sudo apachectl start
```

To make sure Apache is running, open a web browser and navigate to http://localhost:80.
You should see a message saying "It works!".

Install MySQL server:

```shell
brew install mysql
```

Start and enable the MySQL service:

```shell
brew services start mysql
```

Install PHP 8 by running the following command:

```shell
brew install php@8.0
```

Add PHP 8 to your system's PATH environment variable by adding the following line to your ~/.zshrc or ~/.bash_profile file:

```shell
export PATH="/usr/local/opt/php@8.0/bin:$PATH"
```

Install php extensions:

```shell
brew install php@8.0-mysql
```

Restart your terminal or run `source ~/.zshrc` or `source ~/.bash_profile` for the changes to take effect.

Edit the Apache configuration file located at `/usr/local/etc/httpd/httpd.conf`. Uncomment the following line:

```text
LoadModule php_module /usr/local/opt/php@8.0/lib/httpd/modules/libphp8.so
LoadModule php_module /usr/local/opt/php@8.0/lib/httpd/modules/php_pdo_mysql.dll
LoadModule php_module /usr/local/opt/php@8.0/lib/httpd/modules/php_mysqli.dll
```

Add the following lines at the end of the httpd.conf file:

```text
<FilesMatch \.php$>
SetHandler application/x-httpd-php
</FilesMatch>
```

Default webserver pages location is in the ` /usr/local/var/www/` folder.

# Setup the PHP demo

The first step is to run the SQL script to setup the database tables. It is done easily utilizing the `sql/setup.sql`
file included with the demo. After running the file in the SQL manager of your choice (like phpMyAdmin), you need to set
the DB parameters. Rename (or copy) `php/config.template.php` file into `php/config.php` and edit its content.

Change host, username, password and database name to proper values. For example in the following code we define that
user name is `root` and password is `password`. And database named `bryntum_gantt` is located at `localhost` host:

```text
const DBUSERNAME = 'gantt';
const DBUSERPASSWORD = 'password';
const DSN = 'mysql:dbname=gantt;host=localhost';
```

These simple steps will give us a working demo when running `index.html` on your server.
