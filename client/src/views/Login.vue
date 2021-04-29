<template>
  <div>
    <div class="bg font-sans min-h-screen antialiased pt-24 pb-5">
      <div class="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
        <h1 class="font-bold text-center text-4xl text-blue-500">Tec<span class="text-blue-500">&Chill</span></h1>
        <form action="#">
          <div class="flex flex-col card p-10 rounded-lg shadow space-y-6">
            <h1 class="font-bold text-xl text-center text-white">Login</h1>

            <div class="flex flex-col space-y-1">
              <input type="text" name="username" id="username" class="card rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Username" />
            </div>

            <div class="flex flex-col space-y-1">
              <input type="password" name="password" id="password" class="card rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Password" />
            </div>

            <div class="relative">
              <input type="checkbox" name="remember" id="remember" checked class="inline-block align-middle" />
              <label class="text-white ml-2 inline-block align-middle" for="remember">Remember me</label>
            </div>

            <div class="float-right">
              <button type="submit" class="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">Log In</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
</style>