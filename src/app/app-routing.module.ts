import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ChatRoomComponent } from './feature/chat/chat-room/chat-room.component';
import { ChatComponent } from './feature/chat/chat.component';
import { SigninComponent } from './feature/auth/signin/signin.component';
import { AuthGuardService } from './feature/auth/shared/auth-guard.service';

const appRoutes = [
    { path: '', component: ChatComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: SigninComponent },
    { path: 'chatroom/:id', component: ChatRoomComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
