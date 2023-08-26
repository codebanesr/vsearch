### 1. WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.

The warning message you're seeing from Redis indicates that memory overcommit is not enabled. Memory overcommit is a memory management setting that determines how the system handles memory allocation requests that exceed the available physical memory. In your case, enabling memory overcommit is recommended to ensure that Redis operates effectively, especially during background saves or replication processes.

Here are the steps to address the warning and enable memory overcommit:

1. **Temporary Enabling** (Without Reboot):
   
   Run the following command to enable memory overcommit without requiring a system reboot:
   
   ```bash
   sudo sysctl vm.overcommit_memory=1
   ```

   This change will take effect immediately. However, it's temporary and will be reset to its default value when the system is rebooted.

2. **Permanent Enabling** (Requires Reboot):

   If you want to make this setting permanent and survive system reboots, you should modify the `/etc/sysctl.conf` configuration file. Here's how:

   Open the `/etc/sysctl.conf` file in a text editor with superuser privileges. For example:
   
   ```bash
   sudo nano /etc/sysctl.conf
   ```

   Add the following line to the end of the file:
   
   ```
   vm.overcommit_memory=1
   ```

   Save and close the file. Then, apply the changes:
   
   ```bash
   sudo sysctl -p
   ```

   This command will load the updated sysctl settings from the configuration file, including the memory overcommit setting. The change will take effect after a system reboot.

Enabling memory overcommit ensures that Redis can allocate memory as needed, which is important for its proper functioning. However, be aware that changing memory settings can have implications for the overall system behavior, so consider the impact on other applications running on the system.

Remember that these instructions are intended for Linux-based systems. If you're using a different operating system, the steps might vary. Always make sure to back up critical configuration files before making changes.


Certainly! Here's the provided information presented in a clearer Markdown format:

**1. Cross-Origin Request Blocked Error:**
```markdown
**Issue:** Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:8000/api/chat/init. (Reason: CORS request did not succeed). Status code: (null).

**Solution:**
1. Locate the `chat.js` file.
2. Replace `http://localhost:8000` with your server endpoint.
   For example, if your server's address is `http://52.168.83.96:8000`, replace it with that.

This change should resolve the Cross-Origin Request Blocked error.
```

**2. Slow Speed for llama2 Dockerfile:**
```markdown
**Issue:** Slow speed for llama2. The provided [Dockerfile](../Dockerfile) is optimized for BLAS systems. For other systems such as metal (mac silicon chips) or GPU, you need to enable different flags for the `llama-cpp-python`.

**Solution:**
If you are using a system other than BLAS, like metal or GPU:
1. Open the [Dockerfile](../Dockerfile).
2. Modify the flags to match the requirements of your system. Refer to the documentation for specific flags needed for your system.

Making these adjustments should improve the performance of `llama-cpp-python` on your system.
```

Slow execution speeds
If you are running it for the very first time, the speed will be slow as the binary is still being loaded in to memory, consecutive speeds should be faster



## Could not load Llama model from path: llama-2-7b-chat.ggmlv3.q4_K_M.bin.
Download llama model from 
https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML/resolve/main/llama-2-7b-chat.ggmlv3.q4_K_M.bin



# Localai Build on mac [Do not use docker]
Follow the guide here: https://localai.io/basics/build/

### Download bert for embedding if required
wget https://huggingface.co/skeskinen/ggml/resolve/main/all-MiniLM-L6-v2/ggml-model-q4_0.bin -O models/bert