---
layout: default
title: Powershell Obfuscation
tags: [infosec]
---

Due to its deep roots on Windows systems and access to the .NET libraries Powershell is a powerful tool for administrators and attackers alike. It offers a wide range of possibilities to write regular and malicious script code and obfuscate it to the point of unreadability and undetectability by antiviruses. Moreover the code can be executed directly in memory, so that no files and further traces are left on the drive.

The using of Powershell allows an attacker initial access to the victim system - for example through phishing attachments - as well as to move laterally on the victim network and inject further malicious code.

So it is not surprising that this tool stands at the top of the attacker tool list. Be it through self-written and obfuscated code or through frameworks, such as Empire and PowerSploit.

In this blog post I will show many of the attacker methods to obfuscate and hide malicious Powershell code and how to detect and analyze it. The shown obfuscation techniques must not stand alone but can also be used in combination.