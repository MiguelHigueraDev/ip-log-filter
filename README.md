# IP Log Filter

Lightweight tool that lets you filter a log with IP Addresses and export it using IPTables syntax to easily ban them.

## How to use

1. Paste the IP log obtained using a command like `sudo grep sshd /var/log/auth.log` in the "Enter IP log" section
2. (Optional) Add any IPs you wish to ignore (like your own IP addresses), so they get filtered out
3. The formatted IPs will appear in the "Formatted IPs" section. If you wish to see them in IPTables Syntax, press the rightmost button
4. To copy the IP address list press the clipboard button
5. If you want to see each IP address' country, click the download icon in the "Countries" section

## Notes

The geolocalization API is limited to 60 requests per minute, per IP.
