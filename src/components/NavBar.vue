<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">OSRS Tools</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active">Home</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Farming
            </a>
            <ul class="dropdown-menu">
              <RouterLink class="nav-link" to="/farming/tree-runs">Tree runs</RouterLink>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Clue Hunting
            </a>
            <ul class="dropdown-menu">
              <RouterLink class="nav-link" to="/clue-hunting/lightbox-solver">Lightbox Solver</RouterLink>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>